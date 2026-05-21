import {IssueList} from "../Issue/IssueList";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProjectById } from "@/redux/Project/Project.Action";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Loader from "../Loader/Loader";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import InviteUserForm from "./InviteUserForm";

const ProjectDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { project, auth } = useSelector((store) => store);

  useEffect(() => {
    dispatch(fetchProjectById(id));
  }, [id]);

  return (
    <>
      {!project.loading ? (
        <div className="h-screen overflow-hidden px-6 py-4">

          <div className="w-full text-gray-400">

            {/* HEADER */}
            <h1 className="text-lg font-semibold pb-4">
              {project.projectDetails?.name}
            </h1>

            {/* DETAILS */}
            <div className="grid grid-cols-2 gap-4 pb-6 text-sm">

              <p>
                <span className="w-36 inline-block">Project Lead :</span>
                {project.projectDetails?.owner?.fullName}
              </p>

              <div className="flex items-center gap-2">
                <span className="w-36">Members :</span>

                {project.projectDetails?.team?.map((item) => (
                  <Avatar key={item.id} className="h-7 w-7">
                    <AvatarFallback>
                      {item.fullName[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ))}

                {auth.user?.id === project.projectDetails?.owner?.id && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline" className="ml-2">
                        invite <PlusIcon className="w-3 h-3 ml-1" />
                      </Button>
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Invite User</DialogTitle>
                      </DialogHeader>

                      <InviteUserForm projectId={id} />
                    </DialogContent>
                  </Dialog>
                )}
              </div>

              <p>
                <span className="w-36 inline-block">Category :</span>
                {project.projectDetails?.category}
              </p>

              <p>
                <span className="w-36 inline-block">Status :</span>
                <Badge className="bg-orange-300 text-black text-xs">
                  In Progress
                </Badge>
              </p>
            </div>

            {/* TASKS */}
            <section>
              <p className="pb-3 border-b text-lg tracking-wider">
                Tasks
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4">
                <IssueList status="pending" title="Todo List" />
                <IssueList status="in_progress" title="In Progress" />
                <IssueList status="done" title="Done" />
              </div>
            </section>

          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ProjectDetails;
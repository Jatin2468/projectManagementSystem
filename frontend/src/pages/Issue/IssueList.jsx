/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "@radix-ui/react-icons";
import IssueCard from "./IssueCard";
import CreateIssueForm from "./CreateIssueForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchIssues } from "@/redux/Issue/Issue.action";

export function IssueList({ title, status }) {
  const dispatch = useDispatch();
  const { id } = useParams();

  // ✅ SAFE SELECTOR
  const issue = useSelector((store) => store.issue);

  useEffect(() => {
    if (id) {
      dispatch(fetchIssues(id));
    }
  }, [id, dispatch]);

  // ✅ SAFE ARRAY (NO CRASH)
  const issues = issue?.issues || [];

  // ✅ SAFE FILTER
  const filteredIssues = issues.filter(
    (item) =>
      item?.status?.toLowerCase() === status?.toLowerCase()
  );

  return (
    <div>
      <Dialog>
        <Card className="w-full md:w-[320px] lg:w-[340px] bg-gray-900 border border-gray-700 shadow-lg rounded-xl hover:shadow-xl transition">

          {/* HEADER */}
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-white">
              {title}
            </CardTitle>

            <span className="bg-blue-600 text-xs px-2 py-1 rounded-full">
              {filteredIssues.length}
            </span>
          </CardHeader>

          {/* CONTENT */}
          <CardContent className="px-2 max-h-[350px] overflow-y-auto">
            <div className="space-y-3">

              {filteredIssues.length === 0 ? (
                <div className="text-center text-gray-400 text-sm py-6 border border-dashed border-gray-700 rounded-lg">
                  🚀 No issues yet
                </div>
              ) : (
                filteredIssues.map((item) => (
                  <div
                    key={item.id}
                    className="hover:scale-[1.02] transition"
                  >
                    <IssueCard item={item} />
                  </div>
                ))
              )}

            </div>
          </CardContent>

          {/* FOOTER */}
          <CardFooter className="px-2">
            <DialogTrigger asChild>
              <Button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700">
                <PlusIcon /> <span>Create Issue</span>
              </Button>
            </DialogTrigger>
          </CardFooter>
        </Card>

        {/* MODAL */}
        <DialogContent className="border-none w-[350px] bg-gray-900 text-white rounded-xl shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Create New Issue
            </DialogTitle>
          </DialogHeader>

          <CreateIssueForm status={status} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
/* eslint-disable react/prop-types */

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { DotsVerticalIcon, PersonIcon } from "@radix-ui/react-icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import UserList from "./UserList";
import { useDispatch } from "react-redux";
import {
  deleteIssue,
  updateIssueStatus,
} from "@/redux/Issue/Issue.action";
import { useNavigate, useParams } from "react-router-dom";

const IssueCard = ({ item }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch(deleteIssue(item.id));
  };

  const handleStatusChange = (status) => {
    dispatch(updateIssueStatus({ id: item.id, status }));
  };

  return (
    <Card className="rounded-md py-1 pb-2">
      <CardHeader className="py-0 pb-1">
        <div className="flex justify-between items-center">
          <CardTitle
            className="cursor-pointer hover:text-gray-300"
            onClick={() => navigate(`/project/${id}/issue/${item.id}`)}
          >
            {item.title}
          </CardTitle>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                className="rounded-full"
                variant="ghost"
                size="icon"
              >
                <DotsVerticalIcon />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => handleStatusChange("IN_PROGRESS")}
              >
                In Progress
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => handleStatusChange("DONE")}
              >
                Done
              </DropdownMenuItem>

              <DropdownMenuItem>Edit</DropdownMenuItem>

              <DropdownMenuItem onClick={handleDelete}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="py-0">
        <div className="flex items-center justify-between">

          {/* ✅ FIXED ISSUE ID DISPLAY */}
          <p>{item.issueId ? item.issueId : `PM-${item.id}`}</p>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                className="bg-gray-900 hover:text-black text-white rounded-full"
                size="icon"
              >
                <Avatar>
                  <AvatarFallback>
                    {item.assignee?.fullName
                      ? item.assignee.fullName[0].toUpperCase()
                      : <PersonIcon />}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <UserList issueDetails={item} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};

export default IssueCard;
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { createIssue, fetchIssues } from "@/redux/Issue/Issue.action";

const CreateIssue = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title,
      description,
      projectId: id,
    };

    // ✅ create issue
    await dispatch(createIssue(data));

    // ✅ fetch updated issues
    await dispatch(fetchIssues(id));

    // ✅ redirect back
    navigate(`/project/${id}`);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#020617] text-gray-200 px-4">

      <div className="w-full max-w-lg bg-[#0f172a] p-6 rounded-xl shadow-xl border border-gray-800">

        <h1 className="text-xl font-semibold mb-6 text-center">
          Create Issue
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="text-sm text-gray-400">
              Issue Title
            </label>
            <input
              type="text"
              placeholder="Enter issue title..."
              className="w-full mt-1 p-3 rounded-md bg-[#1e293b] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">
              Description
            </label>
            <textarea
              placeholder="Describe the issue..."
              rows={4}
              className="w-full mt-1 p-3 rounded-md bg-[#1e293b] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-3">
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Create Issue
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => navigate(`/project/${id}`)}
            >
              Cancel
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateIssue;
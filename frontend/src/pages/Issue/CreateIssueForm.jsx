import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// ✅ FIXED IMPORT
import { createIssue, fetchIssues } from "@/redux/Issue/Issue.action";

const CreateIssueForm = ({ status, onClose }) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) return;

    setLoading(true);

    const data = {
      ...formData,
      projectId: id,
      status: status,
    };

    try {
      await dispatch(createIssue(data));

      // ✅ refresh issues
      dispatch(fetchIssues(id));

      // ✅ reset form
      setFormData({
        title: "",
        description: "",
      });

      onClose && onClose();
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* TITLE */}
      <div>
        <label className="block mb-1 text-sm text-gray-300">
          Issue Title
        </label>
        <input
          type="text"
          name="title"
          placeholder="Enter issue title..."
          value={formData.title}
          onChange={handleChange}
          className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="block mb-1 text-sm text-gray-300">
          Description
        </label>
        <textarea
          name="description"
          rows="3"
          placeholder="Enter description..."
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* BUTTONS */}
      <div className="flex justify-end gap-3">

        {/* CANCEL */}
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-sm"
        >
          Cancel
        </button>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Issue"}
        </button>
      </div>
    </form>
  );
};

export default CreateIssueForm;
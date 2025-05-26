import { useState } from "react";
import { updateFacultyOverview } from "../../../utils/facultyApi";
import { useQueryClient } from "@tanstack/react-query";

const EditOverviewModal = ({
  facultyId,
  initialOverview,
  onClose,
  onUpdated,
}) => {
  const [overview, setOverview] = useState(initialOverview || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const queryClient = useQueryClient();

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateFacultyOverview(overview, facultyId);
      queryClient.invalidateQueries(["getFacultyById", facultyId]);

      onUpdated(overview);
      onClose();
    } catch (err) {
      setError("Failed to update overview.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-xl w-[90%] max-w-lg p-6 space-y-4 shadow-xl">
        <h2 className="text-xl font-bold text-[#333]">Edit Overview</h2>
        <textarea
          className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[150px]"
          value={overview}
          onChange={(e) => setOverview(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditOverviewModal;

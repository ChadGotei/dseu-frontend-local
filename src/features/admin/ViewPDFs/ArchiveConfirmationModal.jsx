import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

import { SESSION_EXPIRE } from "../../../constants/LOCALES.JS";

import { archivePdf } from "../../../utils/apiservice";
import { showErrorToast, showSuccessToast } from "../../../utils/toasts";

const ArchiveConfirmationModal = ({ state, pdfData, setShowModal }) => {
  const initialArchiveState = pdfData.archive;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, archiveState }) => archivePdf(id, archiveState),
    onSuccess: () => {
      showSuccessToast(`PDF ${state ? "Unarchived" : "Archived"} successfully`);
      queryClient.invalidateQueries({ queryKey: ["notices"] });
      setShowModal(false);
    },
    onError: (error) => {
      if (error?.response?.data?.error) {
        showErrorToast(error.response.data.error);
      } else {
        toast.error(SESSION_EXPIRE || error?.message);
        sessionStorage.clear();
        navigate("/admin-login");
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ id: pdfData._id, archiveState: !initialArchiveState });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-md text-center shadow-xl relative">
        <h2 className="text-xl font-semibold mb-3">
          {state ? "Unarchive this PDF" : "Archive this PDF"}
        </h2>

        <Plus
          className="absolute top-5 right-5 min-h-5 min-w-5 text-gray-400 hover:text-red-500 transition-all rotate-45 hover:cursor-pointer"
          onClick={() => setShowModal(false)}
        />

        <p className="text-gray-600 mb-5">
          Are you sure you want to{" "}
          <span className="font-bold">{state ? "unarchive" : "archive"}</span>{" "}
          this item? This action cannot be undone.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => setShowModal(false)}
            className="flex-1 bg-gray-300 text-black py-2 rounded-md font-semibold hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-red-600 text-white py-2 rounded-md font-semibold hover:bg-red-700 transition-colors disabled:cursor-not-allowed disabled:bg-red-300"
            disabled={mutation.isPending}
          >
            {mutation.isPending
              ? "Updating..."
              : state
              ? "Unarchive"
              : "Archive"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArchiveConfirmationModal;

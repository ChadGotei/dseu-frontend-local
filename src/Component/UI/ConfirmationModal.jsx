const ConfirmationModal = ({ open, onClose, onConfirm, actionType }) => {
    if (!open) return null;

    const getTitle = () => `${actionType} Confirmation`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">{getTitle()}</h2>
                <p className="text-gray-600 whitespace-pre-line">
                    Are you sure you want to proceed with{" "}
                    <span className="font-semibold text-black">{actionType}</span>?
                </p>
                <div className="flex justify-end gap-3 pt-4">
                    <button
                        className="px-4 py-2 border rounded-md hover:bg-gray-100 transition"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                        onClick={onConfirm}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;

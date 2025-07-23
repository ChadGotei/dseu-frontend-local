const statusMessages = {
    freeze: {
        title: "✅ Seat Frozen",
        bgColor: "bg-green-100",
        borderColor: "border-green-400",
        description: [
            "You have successfully frozen your allotted seat.",
            "No further upgradation will be possible in upcoming rounds."
        ],
    },
    float: {
        title: "🔄 Accepted & Upgrade",
        bgColor: "bg-blue-100",
        borderColor: "border-blue-400",
        description: [
            "You have accepted the allotted seat and chosen to upgrade your program.",
            "Your seat is secured, and you may be upgraded to a better program (campus will remain the same)."
        ],
    },
    upgrade: {
        title: "🔁 Not Accepted & Upgrade",
        bgColor: "bg-yellow-100",
        borderColor: "border-yellow-500",
        description: [
            "You have not accepted the current seat but opted for upgradation.",
            "You will be considered for better options in the next rounds."
        ],
    },
    reject: {
        title: "❌ Seat Rejected",
        bgColor: "bg-red-100",
        borderColor: "border-red-400",
        description: [
            "You have rejected the allotted seat.",
            "You will not be considered in further rounds."
        ],
    },
};

const StudentStatusMessage = ({ status }) => {
    const message = statusMessages[status];

    if (!message) return null;

    return (
        <div
            className={`text-center text-sm text-gray-800 mt-6 ${message.bgColor} ${message.borderColor} border px-6 py-4 rounded-xl shadow-md max-w-2xl`}
        >
            <p className="text-lg font-semibold mb-2">{message.title}</p>
            {message.description.map((line, idx) => (
                <p key={idx}>{line}</p>
            ))}
        </div>
    );
};

export default StudentStatusMessage;

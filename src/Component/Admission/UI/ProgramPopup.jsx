import { useEffect, useRef } from "react";

const ProgramPopup = ({ program, onClose }) => {
    const modalContentRef = useRef(null);
    if (!program) return null;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalContentRef.current &&
                !modalContentRef.current.contains(event.target) 
            ) {
                onClose();
            }
        }

        const handleEscapeKey = (event) => {
            if(event.key === "Escape") onClose();
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscapeKey);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscapeKey )
        }
    }, [onClose])

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white w-full max-w-lg rounded-lg shadow-xl p-6 relative animate-fadeIn"
                ref={modalContentRef}>
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
                >
                    ✕
                </button>

                {/* Content */}
                <h2 className="text-2xl font-bold text-blue-900 mb-4">
                    {program.name}
                </h2>

                <div className="flex flex-col gap-4 justify-center">
                    <div className="space-y-3 text-gray-700">
                        <p>
                            <span className="font-semibold">About:</span>{" "}
                            {program.about}
                        </p>

                        <p>
                            <span className="font-semibold">Duration:</span>{" "}
                            {program.duration}
                        </p>

                        <p>
                            <span className="font-semibold">Eligibility:</span>{" "}
                            {program.eligibility}
                        </p>

                        <p>
                            <span className="font-semibold">Fees:</span>{" "}
                            {program.fees}
                        </p>
                    </div>

                    <button className="bg-yellow-100 w-36 mx-auto p-2 rounded-full hover:cursor-pointer  text-gray-600 border-gray-700 border shadow-sm shadow-gray-400 hover:shadow-gray-500 hover:scale-[102%] transition-scale">
                        Apply Now
                    </button>
                </div>

            </div>
        </div>
    )
}

export default ProgramPopup

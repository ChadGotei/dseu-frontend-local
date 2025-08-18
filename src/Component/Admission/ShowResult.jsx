import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query'

import Logo from "../Reusable/Logo";
import StudentPdf from "./StudentPdf";
import ConfirmationModal from '../UI/ConfirmationModal'

import { showErrorToast, showSuccessToast } from "../../utils/toasts";
import { changeStudentStatus } from "../../utils/apiservice";
import { getCategoryFullname } from "../../utils/helper";

const ShowResult = () => {
    const navigate = useNavigate();
    const data = JSON.parse(sessionStorage.getItem("studentResult"));
    const [modalInfo, setModalInfo] = useState({ open: false, action: "" });

    const statusMutation = useMutation({
        mutationFn: ({ id, status }) => changeStudentStatus(id, status),
        onSuccess: (data) => {
            showSuccessToast(`${modalInfo.action} confirmed!`);

            setModalInfo({ open: false, action: "" });
            console.log(data);
            sessionStorage.setItem("studentResult", JSON.stringify(data));
        },
        onError: (err) => {
            showErrorToast(err.response?.data?.message || err.message || "Something went wrong");
            console.error(err); // for dev
        },
    });


    useEffect(() => {
        if (!data) {
            showErrorToast("Enter your details");
            navigate("/admission/result");
        }
    }, [data, navigate]);

    if (!data) return null;

    if (data.message && !data.data) {
        return (
            <div className="flex flex-col justify-center items-center bg-white p-6 my-10">
                <Logo cn="h-20 mb-6" />
                <h2 className="text-xl text-red-600 font-semibold mb-2">No Seat Allotted</h2>
                <p className="text-gray-700 text-center max-w-md">
                    {data.message || "You have not been allotted a seat. Please try again in the next round."}
                </p>
            </div>
        );
    }

    const student = data.data?.student;

    const resultInfo = [
        { label: "Form Number", value: student.form_number }, // to be changed later
        { label: "Name", value: student.name },
        { label: "Program Allocated", value: student.program },
        { label: "Campus Allocated", value: student.campus },
        { label: "Registered Category", value: student.registered_category },   // tbcl
        { label: "Admission Category", value: getCategoryFullname(student.category_allocated) },
        { label: "Program Preference", value: student.program_preference },
        { label: "Generated Rank", value: student.rank },
    ];

    const handleConfirm = () => {
        const status = modalInfo.action === "Freeze" ? "freeze" : "float";
        statusMutation.mutate({ id: student._id, status });
    };

    return (
        <div className="min-h-screen bg-white py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-blue-7   00">Student Allotment</h1>
                        <p className="text-sm text-gray-600">Delhi Skill and Entrepreneurship University</p>
                    </div>
                    <Logo cn={"h-20"} />
                </div>

                <hr className="mb-6" />

                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                    <h2 className="text-lg font-semibold text-gray-700">Applicant Details</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300 rounded-lg">
                        <thead>
                            <tr className="bg-teal-600 text-white">
                                <th className="text-left px-4 py-2 font-medium">Field</th>
                                <th className="text-left px-4 py-2 font-medium">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resultInfo.map((item, idx) => (
                                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className={`px-4 py-2 border-t border-gray-300 text-sm text-gray-700 font-medium`}>
                                        {item.label}
                                    </td>
                                    <td className="px-4 py-2 border-t border-gray-300 text-sm text-gray-800">
                                        {item.value}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Action Buttons or Final Status Messages */}
                <div className="flex flex-col items-center gap-4 mt-10">
                    {student.status === "pending" && (
                        <>
                            <div className="flex gap-6">
                                <button
                                    onClick={() => setModalInfo({ open: true, action: "Freeze" })}
                                    className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3 rounded-xl transition-colors"
                                >
                                    Freeze
                                </button>
                                {student.program_preference !== 1 &&
                                    <button
                                        onClick={() => setModalInfo({ open: true, action: "Accept and Upgrade" })}
                                        className="bg-green-600 hover:bg-green-700 text-white text-lg px-6 py-3 rounded-xl transition-colors"
                                    >
                                        Accept and Upgrade
                                    </button>}
                            </div>

                            <div className="text-sm text-gray-800 mt-4 max-w-2xl p-4 rounded-lg border border-yellow-400 bg-yellow-100/60 backdrop-blur-md shadow-md">
                                <p><span className="font-semibold">✅ Accept & Upgrade</span></p>
                                <p>• To be considered for further upgradation, you must first accept the currently allocated seat.</p>
                                <p>• Upgradation will be considered only for the program, not for the campus preference.</p>

                                <div className="my-2" />

                                <p><span className="font-semibold">🔒 Freeze Allocation</span></p>
                                <p>• By selecting “Freeze”, you are accepting the allocated seat and locking your choice.</p>
                                <p>• You will not be eligible for any further upgradation in subsequent rounds.</p>
                            </div>
                        </>
                    )}

                    {student.status === "freeze" && (
                        <div className="text-center text-sm text-gray-800 mt-6 bg-green-100 border border-green-400 px-6 py-4 rounded-xl shadow-md max-w-2xl">
                            <p className="text-lg font-semibold mb-2">✅ Seat Frozen</p>
                            <p>You have successfully frozen your allotted seat.</p>
                            <p>No further upgradation will be possible in upcoming rounds.</p>
                        </div>
                    )}

                    {student.status === "float" && (
                        <div className="text-center text-sm text-gray-800 mt-6 bg-blue-100 border border-blue-400 px-6 py-4 rounded-xl shadow-md max-w-2xl">
                            <p className="text-lg font-semibold mb-2">🔄 Accepted & Upgrade</p>
                            <p>You have accepted the allotted seat and chosen to upgrade your program.</p>
                            <p>Your seat is secured, and you may be upgraded to a better program (campus will remain the same).</p>
                        </div>
                    )}
                </div>

                <StudentPdf student={student} />

                {/* Confirmation Modal */}
                <ConfirmationModal
                    open={modalInfo.open}
                    actionType={modalInfo.action}
                    onClose={() => setModalInfo({ open: false, action: "" })}
                    onConfirm={handleConfirm}
                />
            </div>
        </div>
    );
};

export default ShowResult;

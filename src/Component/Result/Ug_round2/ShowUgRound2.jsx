import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";

import Logo from "../../Reusable/Logo";
import StudentPdf from "./../StudentPdf";
import { ButtonsDescription } from "./../ShowResult";
import ConfirmationModal from "../../UI/ConfirmationModal";
import StudentStatusMessage from "./../StudentStatusMessage";
import { NoSeatAllocationMessage } from "./../PwdMessage"

import useResultStore from "../../../store/ugRound2Store";
import { changeUgRound2Status } from "../../../utils/resultservices";
import { showErrorToast, showSuccessToast } from "../../../utils/toasts";
import { getCategoryFullname, getStatusFromAction } from "../../../utils/helper";
import { useNavigate } from "react-router-dom";

const ShowBtechRound2 = () => {
    const result = useResultStore((state) => state.result);
    const setResult = useResultStore((state) => state.setResult);
    const navigate = useNavigate();
    const [modalInfo, setModalInfo] = useState({ open: false, action: "" });

    useEffect(() => {
        console.log(result);

        if (!result) {
            showErrorToast("Please enter your details");
            navigate("/admission/result/btech/round2");
        }
    }, [result, navigate]);

    if (!result) return null;

    const student = result?.data?.student ?? {}

    const statusMutation = useMutation({
        mutationFn: ({ id, status }) => changeUgRound2Status(id, status),
        onSuccess: (data) => {
            showSuccessToast(`${modalInfo.action} confirmed!`);

            setTimeout(() => {
                showSuccessToast("Please check your email for updates.");
            }, 2000);

            setModalInfo({ open: false, action: "" });
            console.log(data);    //! remove after development
            setResult(data);
        },
        onError: (err) => {
            showErrorToast(err.response?.data?.message || err.message || "Something went wrong");
            console.error(err); //! for dev
        },
    });

    //? No seat allocation case
    if (result?.message === "You have not alloted any seat please try again in next round") {
        return (
            <NoSeatAllocationMessage />
        )
    }

    const handleConfirm = () => {
        const status = getStatusFromAction(modalInfo.action);
        if (status) {
            statusMutation.mutate({ id: student._id, status });
        } else {
            showErrorToast("Invalid action selected.");
        }
    };

    const resultInfo = [
        { label: "Form Number", value: student.form_number },
        { label: "Name", value: student.name },
        { label: "Program Allocated", value: student.program },
        { label: "Campus Allocated", value: student.campus },
        { label: "Registered Category", value: student.registered_category },
        student.category_allocated && {
            label: "Admission Category",
            value: getCategoryFullname(student.category_allocated),
        },
        { label: "Program Preference", value: student.program_preference },
        { label: "Generated Rank", value: student.rank },
    ].filter(Boolean);

    return (
        <div className="min-h-screen bg-white py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-blue-700">Student Allotment</h1>
                        <p className="text-sm text-gray-600">Delhi Skill and Entrepreneurship University</p>
                    </div>
                    <Logo cn={"h-20"} />
                </div>

                <hr className="mb-6" />

                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                    <h2 className="text-lg font-semibold text-gray-700">Applicant Details</h2>
                </div>

                {/* Details of the student */}
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
                                    <td className="px-4 py-2 border-t border-gray-300 text-sm text-gray-700 font-medium">
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

                <div className="flex flex-col items-center gap-4 mt-10">

                    {student.status === "pending" &&
                        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-lg text-center max-w-xl">
                            <p className="font-semibold text-lg mb-2">Seat Confirmation Closed</p>
                            <p className="text-justify">
                                The seat confirmation window for Undergraduate round 2 admissions is now closed.
                                Please await further communication regarding upcoming rounds or official announcements.
                            </p>
                        </div>
                    }

                    {/* change later according to backend */}
                    <StudentStatusMessage status={student.status} />
                </div>

                {/* Only generate the pdf if student accepted the seat */}
                {(student.status === "freeze" || student.status === "float") &&
                    <StudentPdf student={student} />}


                {/* Confirmation Modal */}
                <ConfirmationModal
                    open={modalInfo.open}
                    actionType={modalInfo.action}
                    onClose={() => setModalInfo({ open: false, action: "" })}
                    onConfirm={handleConfirm}
                />

                {student.status !== "pending" && <div className="mt-10 text-center text-sm text-gray-700">
                    <p>
                        📩 <span className="font-semibold">Didn’t receive an email?</span> Please reach out to us at
                        <a href="mailto:helpdesk-admission@dseu.ac.in" className="text-blue-600 hover:underline ml-1">
                            helpdesk-admission@dseu.ac.in
                        </a>
                    </p>
                </div>}

                {/* <div className="flex items-center justify-center w-full">
                    <a
                        href={"/seat-confirmation-diploma-round2.pdf"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors w-80 mt-10"
                    >
                        View Seat Confirmation Process (PDF)
                    </a>
                </div> */}
            </div>
        </div >
    );
}

export default ShowBtechRound2
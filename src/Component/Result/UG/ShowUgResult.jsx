import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';

import Logo from "../../Reusable/Logo";
import useResultStore from "../../../store/resultStore";
import { changeStudentStatus, changeUGStudentStatus } from "../../../utils/apiservice";
import { showErrorToast, showSuccessToast } from "../../../utils/toasts";
import { getCategoryFullname, getStatusFromAction } from "../../../utils/helper";

import StudentPdf from "../StudentPdf";
import ConfirmationModal from "../../UI/ConfirmationModal";
import StudentStatusMessage from "../StudentStatusMessage";
import { NoSeatAllocationMessage, PwdMessagebtech } from "../PwdMessage";

const ShowUgResult = () => {
  const result = useResultStore((state) => state.result);
  const setResult = useResultStore((state) => state.setResult);
  const navigate = useNavigate();
  const [modalInfo, setModalInfo] = useState({ open: false, action: "" });

  useEffect(() => {
    if (!result) {
      showErrorToast("Please enter your details");
      navigate("/admission/result/ug");
    }
  }, [result, navigate]);

  if (!result) return null;

  const isUg = true;
  const message = result.message;
  const student = result?.data?.student ?? {};

  // TODO: Change according to the messages sent by backend
  if (message === "You have not alloted any seat please try again in next round") {
    return <NoSeatAllocationMessage />;
  }

  // TODO: Change their dates and stuff according to shivam sir
  if (message === "PWD Student Found" || message === "defence Student Found") {
    return <PwdMessagebtech isUg={true} />;
  }

  // TODO: Change this according to backend
  const statusMutation = useMutation({
    mutationFn: ({ id, status }) => changeUGStudentStatus(id, status),
    onSuccess: (updatedData) => {
      showSuccessToast(`${modalInfo.action} confirmed!`);
      setTimeout(() => {
        showSuccessToast("Please check your email for updates.");
      }, 2000);
      setModalInfo({ open: false, action: "" });
      setResult(updatedData); // update Zustand store
    },
    onError: (err) => {
      showErrorToast(err.response?.data?.message || err.message || "Something went wrong");
      console.error(err);
    },
  });

  const handleConfirm = () => {
    const status = getStatusFromAction(modalInfo.action);
    if (status) {
      statusMutation.mutate({ id: student._id, status });
    } else {
      showErrorToast("Invalid action selected.");
    }
  };

  // TODO: Change if neededd sayad karna nhi hoga
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
    // { label: "Program Preference", value: student.program_preference },
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
                <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
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

        {/* BUTTONs */}
        <div className="flex flex-col items-center gap-4 mt-10">
          {student.status === "pending" && (
            <>
              {student.campus_preference === true ? (
                <div className="flex gap-6">
                  <button
                    onClick={() => setModalInfo({ open: true, action: "Freeze" })}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3 rounded-xl transition-colors"
                  >
                    Freeze
                  </button>
                  <button
                    onClick={() => setModalInfo({ open: true, action: "Reject" })}
                    className="bg-red-600 hover:bg-red-700 text-white text-lg px-6 py-3 rounded-xl transition-colors"
                  >
                    Reject
                  </button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={() => setModalInfo({ open: true, action: "Final Acceptance" })}
                    className="bg-green-600 hover:bg-green-700 text-white text-lg px-5 py-3 rounded-xl transition-colors"
                  >
                    Final Acceptance
                  </button>
                  <button
                    onClick={() => setModalInfo({ open: true, action: "Accept and Upgrade" })}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-5 py-3 rounded-xl transition-colors"
                  >
                    Accept and Upgrade
                  </button>
                  <button
                    onClick={() => setModalInfo({ open: true, action: "Not Accepted and Upgrade" })}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white text-lg px-5 py-3 rounded-xl transition-colors"
                  >
                    Not Accepted and Upgrade
                  </button>
                  <button
                    onClick={() => setModalInfo({ open: true, action: "Not Accepted" })}
                    className="bg-red-600 hover:bg-red-700 text-white text-lg px-5 py-3 rounded-xl transition-colors"
                  >
                    Not Accepted
                  </button>
                </div>
              )}

              <ButtonsDescription student={student} />
            </>
          )}

          <StudentStatusMessage status={student.status} />
        </div>

        {(student.status === "freeze" || student.status === "float") && <StudentPdf student={student} />}

        <ConfirmationModal
          open={modalInfo.open}
          actionType={modalInfo.action}
          onClose={() => setModalInfo({ open: false, action: "" })}
          onConfirm={handleConfirm}
        />

        {student.status !== "pending" && (
          <div className="mt-10 text-center text-sm text-gray-700">
            <p>
              📩 <span className="font-semibold">Didn’t receive an email?</span> Please reach out to us at
              <a href="mailto:helpdesk-admission@dseu.ac.in" className="text-blue-600 hover:underline ml-1">
                helpdesk-admission@dseu.ac.in
              </a>
            </p>
          </div>
        )}

        {/* // TODO: Change this if new pdf given or comment this out
        <div className="flex items-center justify-center w-full">
          <a
            href="/seat-confirmation-ug.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors w-80 mt-10"
          >
            View UG Seat Confirmation Process (PDF)
          </a>
        </div> */}
      </div>
    </div>
  );
};

const ButtonsDescription = ({ student }) => {
  return (
    <div className="text-sm text-gray-800 mt-6 max-w-2xl p-4 rounded-lg border border-yellow-400 bg-yellow-100/60 backdrop-blur-md shadow-md">
      {student.campus_preference === true ? (
        <>
          <p><span className="font-semibold">🔒 Freeze Allocation:</span> Accept and lock the current allocated seat. No upgrades will be provided.</p>
          <div className="my-2" />
          <p><span className="font-semibold">❌ Reject:</span> You are declining the seat. You will not be considered in further rounds.</p>
        </>
      ) : (
        <>
          <p><span className="font-semibold">✅ Final Acceptance:</span> Accept current seat and opt out of future rounds.</p>
          <p><span className="font-semibold">🔄 Accept and Upgrade:</span> Accept this seat and stay open for program upgrade (campus won't change).</p>
          <p><span className="font-semibold">❔ Not Accepted and Upgrade:</span> Don’t accept this seat but want to try for better one in next round.</p>
          <p><span className="font-semibold">❌ Not Accepted:</span> Fully reject the seat and don’t want to participate in further rounds.</p>
        </>
      )}
    </div>
  );
};

export default ShowUgResult;

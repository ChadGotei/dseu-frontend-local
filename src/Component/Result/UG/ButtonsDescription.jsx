export const ButtonsDescription = ({ student }) => {
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
          <p><span className="font-semibold">🔄 Accept and Upgrade:</span> Accept this seat and stay open for program and campus upgrade.</p>
          <p><span className="font-semibold">❔ Not Accepted and Upgrade:</span> Don’t accept this seat but want to try for better one in next round.</p>
          <p><span className="font-semibold">❌ Not Accepted:</span> Fully reject the seat and don’t want to participate in further rounds.</p>
        </>
      )}
    </div>
  );
};
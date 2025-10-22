import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import HeadingText from "../../../Component/Reusable/HeadingText";
import MobileSelectBar from "../components/MobileSelectbar";
import departmentData from "../data/department_research_committee.json";

const departments = Object.keys(departmentData).map((key, index) => ({
  _id: String(index + 1),
  key: key,
  name: key,
}));

const committeeMembersByDept = Object.entries(departmentData).reduce(
  (acc, [key, value]) => {
    acc[key] = value.members || [];
    return acc;
  },
  {}
);

const defaultDept = departments[0]?.key || "";

const DoctoralResearchCommittee = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const deptFromQuery = searchParams.get("dept");
  const isValidDept = departments.some((d) => d.key === deptFromQuery);
  const initialDept = isValidDept ? deptFromQuery : defaultDept;
  const [deptKey, setDeptKey] = useState(initialDept);

  useEffect(() => {
    if (!isValidDept) {
      setSearchParams({ dept: defaultDept });
      setDeptKey(defaultDept);
    } else if (deptFromQuery !== deptKey) {
      setDeptKey(deptFromQuery);
    }
  }, [deptFromQuery, isValidDept, setSearchParams, deptKey]);

  const handleDeptChange = (key) => {
    setDeptKey(key);
    setSearchParams({ dept: key });
  };

  const departmentButtons = useMemo(() => {
    return departments.map((dept) => (
      <button
        key={dept._id}
        className={`flex items-center justify-center p-2 rounded-md transition-colors ${deptKey === dept.key
          ? "bg-blue-600 text-white"
          : "bg-white hover:bg-blue-100 text-gray-700"
          } shadow`}
        onClick={() => handleDeptChange(dept.key)}
      >
        <span className="text-center p-1">{dept.name}</span>
      </button>
    ));
  }, [deptKey]);

  const committeeMembers = committeeMembersByDept[deptKey] || [];

  return (
    <div className="flex w-full my-10 text-gray-800 flex-col md:flex-row md:px-10 px-6 gap-5 lg:gap-10 md:gap-3">
      <div
        className="w-[250px] min-w-[230px] md:sticky top-0 bg-gray-100 p-5 rounded-lg shadow-md my-10 hidden md:block h-[600px] overflow-y-auto scrollbar-blue"
      >
        <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-4 text-[#333]">
          Departments
        </h3>
        <div className="grid grid-cols-1 gap-3">{departmentButtons}</div>
      </div>

      <div className="md:hidden block">
        <HeadingText heading={"Departmental Research Committee"} />
      </div>

      <MobileSelectBar
        deptKey={deptKey}
        setDeptKey={handleDeptChange}
        data={departments}
      />

      <div className="flex-1 flex flex-col">
        <div className="text-center text-4xl mt-6 mb-10 font-bold md:block hidden">
          <HeadingText
            heading={`Departmental Research Committee - ${departments.find((d) => d.key === deptKey)?.name || "Committee Members"
              }`}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg bg-white shadow-md">
            <thead className="bg-blue-500 text-white">
              <tr className="text-xs md:text-sm lg:text-base">
                <th className="px-4 py-2 text-left">S.No.</th>
                <th className="px-4 py-2 text-left">Name of Member</th>
                <th className="px-4 py-2 text-left">Role</th>
              </tr>
            </thead>
            <tbody className="text-xs md:text-sm lg:text-[0.95rem]">
              {committeeMembers.length > 0 ? (
                committeeMembers.map((member, index) => (
                  <tr
                    key={index}
                    className="border-t hover:bg-blue-50 transition"
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2 font-medium text-blue-700">
                      {member.name || "-"}
                    </td>
                    <td className="px-4 py-2">{member.role || "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No committee members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctoralResearchCommittee;

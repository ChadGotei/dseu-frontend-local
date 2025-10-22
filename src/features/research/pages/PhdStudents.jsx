import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MobileSelectBar from "../components/MobileSelectbar";
import phdData from "../data/phd_students_2023.json";

//? data of more years to be provided
const departments = Object.keys(phdData.departments).map((key, index) => ({
  _id: String(index + 1),
  key,
  name: key.replace(/_/g, " "),
}));

const studentsByDept = phdData.departments;
const academicYear = phdData.academic_year || "2023";
const defaultDept = departments[0]?.key || "";

const PhdStudents = () => {
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

  const departmentButtons = useMemo(
    () =>
      departments.map((dept) => (
        <button
          key={dept._id}
          className={`flex items-center justify-center p-2 rounded-md transition-colors ${deptKey === dept.key
              ? "bg-blue-600 text-white"
              : "bg-white hover:bg-blue-100 text-gray-700"
            } shadow`}
          onClick={() => handleDeptChange(dept.key)}
        >
          <span className="text-center p-1 capitalize">{dept.name}</span>
        </button>
      )),
    [deptKey]
  );

  const students = studentsByDept[deptKey] || [];

  return (
    <div className="flex w-full my-10 text-gray-800 flex-col md:flex-row md:px-10 px-6 gap-5 lg:gap-10 md:gap-3">
      {/* Sidebar */}
      <div className="w-[250px] min-w-[230px] h-fit md:sticky top-0 bg-gray-100 p-5 rounded-lg shadow-md my-10 hidden md:block">
        <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-4 text-[#333]">
          Departments
        </h3>
        <div className="grid grid-cols-1 gap-3">{departmentButtons}</div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden block text-center text-2xl font-bold">
        PhD Students
      </div>
      <MobileSelectBar
        deptKey={deptKey}
        setDeptKey={handleDeptChange}
        data={departments}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="text-center mt-6 mb-2 font-bold text-blue-700">
          Academic Year: {academicYear}
        </div>

        <h1 className="text-center text-3xl mb-6 font-bold md:block hidden">
          Department of{" "}
          {departments.find((d) => d.key === deptKey)?.name || "PhD Students"}
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg bg-white shadow-md">
            <thead className="bg-blue-500 text-white">
              <tr className="text-xs md:text-sm lg:text-base">
                <th className="px-4 py-2 text-left">S.No.</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Supervisor</th>
                <th className="px-4 py-2 text-left">RAC</th>
              </tr>
            </thead>
            <tbody className="text-xs md:text-sm lg:text-[0.95rem]">
              {students.length > 0 ? (
                students.map((s, index) => (
                  <tr
                    key={index}
                    className="border-t hover:bg-blue-50 transition"
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{s.name || "-"}</td>
                    <td className="px-4 py-2">{s.supervisor || "-"}</td>
                    <td className="px-4 py-2">{s.RAC || "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No students found.
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

export default PhdStudents;

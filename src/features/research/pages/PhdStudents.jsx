import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MobileSelectBar from "../components/MobileSelectbar";
import phdDataAll from "../data/phd_students.json";

const PhdStudents = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const academicYears = phdDataAll.years.map((y) => y.academic_year);

  const yearFromQuery = searchParams.get("year") || academicYears[0];
  const selectedYearData =
    phdDataAll.years.find((y) => y.academic_year === yearFromQuery) ||
    phdDataAll.years[0];

  const departments = Object.keys(selectedYearData.departments).map(
    (key, index) => ({
      _id: String(index + 1),
      key,
      name: key.replace(/_/g, " "),
    })
  );

  const studentsByDept = selectedYearData.departments;
  const defaultDept = departments[0]?.key || "";
  const deptFromQuery = searchParams.get("dept");
  const isValidDept = departments.some((d) => d.key === deptFromQuery);
  const initialDept = isValidDept ? deptFromQuery : defaultDept;

  const [deptKey, setDeptKey] = useState(initialDept);
  const [selectedYear, setSelectedYear] = useState(yearFromQuery);

  useEffect(() => {
    if (!isValidDept) {
      setSearchParams({ dept: defaultDept, year: selectedYear });
      setDeptKey(defaultDept);
    } else if (deptFromQuery !== deptKey) {
      setDeptKey(deptFromQuery);
    }
  }, [deptFromQuery, isValidDept, setSearchParams, deptKey, selectedYear]);

  const handleDeptChange = (key) => {
    setDeptKey(key);
    setSearchParams({ dept: key, year: selectedYear });
  };

  const handleYearChange = (year) => {
    const yearData =
      phdDataAll.years.find((y) => y.academic_year === year) ||
      phdDataAll.years[0];
    const firstDept = Object.keys(yearData.departments)[0] || "";
    setSelectedYear(year);
    setDeptKey(firstDept);
    setSearchParams({ year, dept: firstDept });
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
    [deptKey, departments]
  );

  const students = studentsByDept[deptKey] || [];
  const yearButtons = (
    <div className="flex flex-wrap items-center justify-center gap-3 mb-8 mt-4 bg-gray-50 px-4 py-3 rounded-xl shadow-sm">

      <div className="text-lg md:text-xl font-semibold text-gray-800 mr-3">
        Academic Year:
      </div>
      
      {academicYears.map((year) => (
        <button
          key={year}
          onClick={() => handleYearChange(year)}
          className={`px-4 py-2 rounded-lg font-medium text-sm md:text-base border transition-all duration-200 ${selectedYear === year
            ? "bg-blue-600 text-white border-blue-600 shadow-md scale-[1.05]"
            : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-400"
            }`}
        >
          {year}
        </button>
      ))}
    </div>
  );

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
        {/* Year Tabs */}
        <div className="text-center mt-2 mb-4">{yearButtons}</div>

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

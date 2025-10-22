import { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import HeadingText from "../../../Component/Reusable/HeadingText";
import MobileSelectBar from "../components/MobileSelectbar";
import departmentData from "../data/list_of_supervisors.json";

//? Specizliation is not provided to us
const departments = Object.keys(departmentData).map((key, index) => ({
  _id: String(index + 1),
  key: key,
  name: departmentData[key].name || "Department",
}));

const supervisorsByDept = Object.entries(departmentData).reduce(
  (acc, [key, value]) => {
    acc[key] = value.supervisors || [];
    return acc;
  },
  {}
);

const defaultDept = departments[0]?.key || "";

const Supervisors = () => {
  const navigate = useNavigate();

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

  const handleClickSupervisor = (hasData, slug) => {
    if (!hasData) return;
    return navigate(`/research/supervisor/${slug}`);
  }

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

  const supervisors = supervisorsByDept[deptKey] || [];

  return (
    <div className="flex w-full my-10 text-gray-800 flex-col md:flex-row md:px-10 px-6 gap-5 lg:gap-10 md:gap-3">
      <div
        className="w-[250px] min-w-[230px] h-fit md:sticky top-0 bg-gray-100 p-5 rounded-lg shadow-md my-10 hidden md:block max-h-[80vh] overflow-y-scroll scrollbar-blue"
      >
        <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-4 text-[#333]">
          Departments
        </h3>
        <div className="grid grid-cols-1 gap-3">{departmentButtons}</div>
      </div>

      <div className="md:hidden block">
        <HeadingText heading={"Supervisors"} />
      </div>

      <MobileSelectBar
        deptKey={deptKey}
        setDeptKey={handleDeptChange}
        data={departments}
      />

      <div className="flex-1 flex flex-col">
        <div className="text-center text-4xl mt-6 mb-10 font-bold md:block hidden">
          <HeadingText
            heading={`Department of ${departments.find((d) => d.key === deptKey)?.name || "Supervisors"
              }`}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg bg-white shadow-md">
            <thead className="bg-blue-500 text-white">
              <tr className="text-xs md:text-sm lg:text-base">
                <th className="px-4 py-2 text-left">S.No.</th>
                <th className="px-4 py-2 text-left">Name of Supervisor</th>
                <th className="px-4 py-2 text-left">Designation</th>
                <th className="px-4 py-2 text-left">Supervisor ID</th>
                <th className="px-4 py-2 text-left">Specialization</th>
              </tr>
            </thead>
            <tbody className="text-xs md:text-sm lg:text-[0.95rem]">
              {supervisors.length > 0 ? (
                supervisors.map((sup, index) => (
                  <tr
                    key={sup.supervisor_id || index}
                    className={`border-t hover:bg-blue-50 transition ${sup.hasData === true ? 'cursor-pointer' : 'cursor-default'}`}
                    onClick={() => handleClickSupervisor(sup.hasData ?? false, sup.slug)}
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2 font-medium text-blue-700">
                      {sup.name || "-"}
                    </td>
                    <td className="px-4 py-2">{sup.designation || "-"}</td>
                    <td className="px-4 py-2">{sup.supervisor_id || "-"}</td>
                    <td className="px-4 py-2 italic text-gray-600">
                      {sup.specialization || "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No supervisors found.
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

export default Supervisors;

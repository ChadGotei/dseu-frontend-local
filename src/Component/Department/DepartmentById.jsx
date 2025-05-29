import React, { useEffect, useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { ChevronDown } from "lucide-react";

import { getDepartmentsBySchool } from "../../utils/apiservice";

import ProgramsByDepartment from "./ProgramsByDepartment";
import FacultyByDepartment from "./FacultyByDepartment";
import OrangeLoader from "../PageLoader/OrangeLoader";

const DepartmentById = () => {
  const [deptId, setDeptId] = useState(null);
  const [activeTab, setActiveTab] = useState("program");
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["getDepartmentById", id],
    queryFn: () => getDepartmentsBySchool(id),
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (!deptId) {
      if (data?.departments && data.departments.length > 0) {
        setDeptId(data.departments[0]._id);
      }
    }
  }, [deptId, data]);

  const departmentButtons = useMemo(() => {
    if (!data?.departments) return null;
    return data.departments.map((dept) => (
      <button
        key={dept._id}
        className={`flex items-center justify-center p-2 rounded-md transition-colors ${
          deptId === dept._id
            ? "bg-blue-500 text-white"
            : "bg-white hover:bg-blue-100 text-gray-700"
        } shadow`}
        onClick={() => setDeptId(dept._id)}
      >
        <span className="text-center p-1">{dept.name}</span>
      </button>
    ));
  }, [data?.departments, deptId]);

  if (isLoading) {
    return <OrangeLoader />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 font-semibold">
        Error: {error.message}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center text-gray-600">No department found.</div>
    );
  }

  return (
    <div className="flex w-full my-10 text-gray-800 flex-col md:flex-row md:px-10 px-6 gap-5 lg:gap-10 md:gap-3">
      {/* desktop view of navbar */}
      <div className="w-1/5 h-fit md:sticky top-0 bg-gray-100 p-5 rounded-lg shadow-md my-10 hidden md:block">
        <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-4 text-[#333]">
          Departments
        </h3>
        <div className="grid grid-cols-1 gap-3">{departmentButtons}</div>
      </div>

      {/* Mobile departments bar */}
      <h1 className="text-center text-xl font-bold block md:hidden">
        {data?.name}
      </h1>
      <MobileSelectBar deptId={deptId} setDeptId={setDeptId} data={data} />

      {/*  main content, either faculty or program  */}
      <div className="flex-1 flex flex-col">
        <h1 className="text-center text-3xl mt-6 mb-10 font-bold md:block hidden">
          {data?.name}
        </h1>
        <div className="flex border-b border-gray-300">
          <button
            className={`flex-1 py-2 text-center ${
              activeTab === "program"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("program")}
          >
            Program
          </button>
          <button
            className={`flex-1 py-2 text-center ${
              activeTab === "faculty"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("faculty")}
          >
            Faculty
          </button>
        </div>

        <div className="md:p-4 py-3">
          {activeTab === "faculty" && <FacultyByDepartment deptId={deptId} />}
          {activeTab === "program" && <ProgramsByDepartment deptId={deptId} />}
        </div>
      </div>
    </div>
  );
};

const MobileSelectBar = React.memo(({ deptId, setDeptId, data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedDept = useMemo(() => {
    return data.departments.find((dept) => dept._id === deptId);
  }, [data.departments, deptId]);

  return (
    <div className="md:hidden w-full flex justify-center items-center mb-4 relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-[90%] max-w-md flex items-center justify-between px-4 py-3 border border-blue-500 rounded-md bg-white text-blue-500 font-medium shadow-md"
      >
        {selectedDept ? selectedDept.name : "Select a department"}
        <ChevronDown className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute top-12 w-[90%] max-w-md bg-white border border-gray-300 shadow-md rounded-md overflow-hidden z-10">
          {data.departments.map((dept) => (
            <button
              key={dept._id}
              className={`w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-500 transition-colors ${
                deptId === dept._id ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => {
                setDeptId(dept._id);
                setIsOpen(false);
              }}
            >
              {dept.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
});

export default DepartmentById;

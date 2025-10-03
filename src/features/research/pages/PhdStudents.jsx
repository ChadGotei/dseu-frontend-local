import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronDown } from "lucide-react";

// TODO: make a go back button that would redirect to /reserch
// TODO: replace demo data with original data
// TODO: add API if the data is going to be dynamic

// Demo departments
const demoDepartments = [
  { _id: "1", key: "computer-science", name: "Computer Science" },
  { _id: "2", key: "ece", name: "Electronics & Communication" },
  { _id: "3", key: "mechanical", name: "Mechanical Engineering" },
  { _id: "4", key: "civil", name: "Civil Engineering" },
];

// Demo PhD students mapped by department key
const demoPhdStudents = {
  "computer-science": [
    {
      id: "p1",
      name: "Ravi Kumar",
      enrollment: "CS2023PHD01",
      specialization: "Machine Learning",
      supervisor: "Dr. A. Sharma",
    },
    {
      id: "p2",
      name: "Priya Singh",
      enrollment: "CS2023PHD02",
      specialization: "Cyber Security",
      supervisor: "Dr. B. Gupta",
    },
  ],
  ece: [
    {
      id: "p3",
      name: "Amit Verma",
      enrollment: "ECE2023PHD01",
      specialization: "VLSI Design",
      supervisor: "Dr. C. Mehta",
    },
    {
      id: "p4",
      name: "Sneha Iyer",
      enrollment: "ECE2023PHD02",
      specialization: "Wireless Communication",
      supervisor: "Dr. D. Reddy",
    },
  ],
  mechanical: [
    {
      id: "p5",
      name: "Arjun Nair",
      enrollment: "ME2023PHD01",
      specialization: "Robotics",
      supervisor: "Dr. E. Kumar",
    },
  ],
  civil: [
    {
      id: "p6",
      name: "Neha Gupta",
      enrollment: "CE2023PHD01",
      specialization: "Structural Engineering",
      supervisor: "Dr. F. Singh",
    },
  ],
};

const defaultDept = "computer-science";

const PhdStudents = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const deptFromQuery = searchParams.get("dept");

  const isValidDept = demoDepartments.some((d) => d.key === deptFromQuery);
  const initialDept = isValidDept ? deptFromQuery : defaultDept;

  const [deptKey, setDeptKey] = useState(initialDept);

  // sync state + URL with valid dept
  useEffect(() => {
    if (!isValidDept) {
      setSearchParams({ dept: defaultDept });
      setDeptKey(defaultDept);
    } else if (deptFromQuery !== deptKey) {
      setDeptKey(deptFromQuery);
    }
  }, [deptFromQuery, isValidDept, setSearchParams, deptKey]);

  const departmentButtons = useMemo(() => {
    return demoDepartments.map((dept) => (
      <button
        key={dept._id}
        className={`flex items-center justify-center p-2 rounded-md transition-colors ${
          deptKey === dept.key
            ? "bg-blue-500 text-white"
            : "bg-white hover:bg-blue-100 text-gray-700"
        } shadow`}
        onClick={() => handleDeptChange(dept.key, setDeptKey, setSearchParams)}
      >
        <span className="text-center p-1">{dept.name}</span>
      </button>
    ));
  }, [deptKey]);

  const phdStudents = demoPhdStudents[deptKey] || [];

  return (
    <div className="flex w-full my-10 text-gray-800 flex-col md:flex-row md:px-10 px-6 gap-5 lg:gap-10 md:gap-3">
      {/* Sidebar */}
      <div className="w-1/5 h-fit md:sticky top-0 bg-gray-100 p-5 rounded-lg shadow-md my-10 hidden md:block">
        <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-4 text-[#333]">
          Departments
        </h3>
        <div className="grid grid-cols-1 gap-3">{departmentButtons}</div>
      </div>

      {/* Mobile department select */}
      <h1 className="text-center text-3xl font-bold block md:hidden">
        PhD Students
      </h1>
      <MobileSelectBar
        deptKey={deptKey}
        setDeptKey={(key) =>
          handleDeptChange(key, setDeptKey, setSearchParams)
        }
        data={demoDepartments}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <h1 className="text-center text-4xl mt-6 mb-10 font-bold md:block hidden">
          PhD Students
        </h1>

        {/* Student list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {phdStudents.map((student) => (
            <div
              key={student.id}
              className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition"
            >
              <h4 className="font-bold text-blue-700 text-lg">{student.name}</h4>
              <p className="text-gray-600 text-sm">
                Enrollment: {student.enrollment}
              </p>
              <p className="text-gray-500 text-sm italic">
                Specialization: {student.specialization}
              </p>
              <p className="text-gray-600 text-sm">
                Supervisor: {student.supervisor}
              </p>
            </div>
          ))}
          {phdStudents.length === 0 && (
            <p className="text-gray-600 text-center">
              No PhD students found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const handleDeptChange = (key, setDeptKey, setSearchParams) => {
  setDeptKey(key);
  setSearchParams({ dept: key });
};

// TODO: Make a reusable component for this
// Mobile select bar
const MobileSelectBar = React.memo(({ deptKey, setDeptKey, data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedDept = useMemo(() => {
    return data.find((dept) => dept.key === deptKey);
  }, [data, deptKey]);

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
          {data.map((dept) => (
            <button
              key={dept._id}
              className={`w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-500 transition-colors ${
                deptKey === dept.key ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => {
                setDeptKey(dept.key);
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

export default PhdStudents;

import React, { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

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
              className={`w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-500 transition-colors ${deptKey === dept.key ? "bg-blue-500 text-white" : ""
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

export default MobileSelectBar;
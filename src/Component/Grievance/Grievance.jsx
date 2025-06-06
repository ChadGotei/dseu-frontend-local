import { useState } from "react";
import StudentGrievanceForm from "./StudentForm";
import EmployeeGrievanceForm from "./EmployeeForm";
import RTIDisclosure from "./RTI";

export default function GrievanceForms() {
  const [activeTab, setActiveTab] = useState("student");

  return (
    <div className="max-w-[90rem] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-white rounded-xl shadow-md">
      {/* Tabs */}
      <div className="flex flex-col items-center">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 border-b border-gray-300 w-full">
          {["student", "employee", "rti"].map((tab) => (
            <button
              key={tab}
              className={`py-2 px-4 sm:px-6 md:px-7 text-sm sm:text-base font-semibold transition-all duration-200 border-b-4 rounded-t-md
            ${
              activeTab === tab
                ? "text-blue-600 border-blue-600 bg-blue-50 shadow-sm"
                : "text-gray-600 border-transparent hover:border-gray-300 hover:bg-gray-100"
            }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "student"
                ? "Student Grievance"
                : tab === "employee"
                ? "Employee Grievance"
                : "RTI"}
            </button>
          ))}
        </div>

        {/* Form Content */}
        <div className="w-full mt-6">
          {activeTab === "student" ? (
            <StudentGrievanceForm />
          ) : activeTab === "employee" ? (
            <EmployeeGrievanceForm />
          ) : (
            <RTIDisclosure />
          )}
        </div>
        <div className="mt-8 text-sm text-center text-gray-700">
          For advanced service of court-related petitions, email us at{" "}
          <a
            href="mailto:osd.legal@dseu.ac.in"
            className="text-orange-600 hover:underline font-medium"
          >
            osd.legal@dseu.ac.in
          </a>
        </div>
      </div>
    </div>
  );
}

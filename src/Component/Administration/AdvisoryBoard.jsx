import { FaArrowRight } from "react-icons/fa";

const StatutoryCommittees = () => {
  const committees = [
    
    { name: "Internal Complaints Committee (ICC)", file: "/statutory_committees/ICC.pdf" },
    { name: "Student Redressal Committee", file: "/statutory_committees/Student Greivence.pdf" },
    { name: "Equal Opportunity Cell", file: "/statutory_committees/Equal Oppurtunity Cell.pdf" },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-[#333] mb-6 text-center">
        Statutory Committees
      </h2>
      <ul className="space-y-4">
        {committees.map((committee, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-white shadow-md rounded-lg px-5 py-3 hover:shadow-lg transition-shadow"
          >
            <span className="text-lg font-medium text-[#333]">{committee.name}</span>
            <a
              href={committee.file}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c4933f] hover:text-[#8f5206] flex items-center"
            >
              <span className="mr-1">View</span>
              <FaArrowRight />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StatutoryCommittees;

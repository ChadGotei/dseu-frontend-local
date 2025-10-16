import React from "react";

const DoctoralResearchCommittee = () => {
  const departments = [
    {
      name: "Computer Science Department",
      members: [
        { id: 1, name: "Prof. Rajesh Sharma", designation: "Professor", role: "Chairperson" },
        { id: 2, name: "Dr. Ananya Gupta", designation: "Associate Professor", role: "Member" },
        { id: 3, name: "Dr. Rakesh Yadav", designation: "Assistant Professor", role: "Member" },
      ],
    },
    {
      name: "Electronics & Communication Department",
      members: [
        { id: 1, name: "Prof. Meera Patel", designation: "Professor", role: "Chairperson" },
        { id: 2, name: "Dr. Vivek Kumar", designation: "Associate Professor", role: "Member" },
        { id: 3, name: "Dr. Shreya Nair", designation: "Assistant Professor", role: "Member" },
      ],
    },
    {
      name: "Mechanical Engineering Department",
      members: [
        { id: 1, name: "Prof. Vikram Singh", designation: "Professor", role: "Chairperson" },
        { id: 2, name: "Dr. Mohit Chauhan", designation: "Associate Professor", role: "Member" },
        { id: 3, name: "Dr. Priya Sharma", designation: "Assistant Professor", role: "Member" },
      ],
    },
    {
      name: "Civil Engineering Department",
      members: [
        { id: 1, name: "Prof. Anjali Reddy", designation: "Professor", role: "Chairperson" },
        { id: 2, name: "Dr. Neha Kapoor", designation: "Associate Professor", role: "Member" },
        { id: 3, name: "Dr. Rohit Sinha", designation: "Assistant Professor", role: "Member" },
      ],
    },
    {
      name: "Management Studies Department",
      members: [
        { id: 1, name: "Prof. Amit Verma", designation: "Professor", role: "Chairperson" },
        { id: 2, name: "Dr. Karan Bansal", designation: "Associate Professor", role: "Member" },
        { id: 3, name: "Dr. Sneha Rao", designation: "Assistant Professor", role: "Member" },
      ],
    },
  ];

  return (
    <div className="w-full px-6 md:px-10 py-10 text-gray-800">
      <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-10 text-center">
        Departmental Research Committee
      </h1>

      <div className="space-y-8">
        {departments.map((dept, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition"
          >
            {/* Department Header */}
            <div className="bg-blue-50 px-6 py-4 rounded-t-xl border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-blue-800">
                {dept.name}
              </h2>
            </div>

            {/* Members Table */}
            <div className="p-6 overflow-x-auto">
              <table className="min-w-full border border-gray-300 rounded-lg">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="border px-4 py-2 text-left text-gray-700 font-semibold w-16">
                      S.No
                    </th>
                    <th className="border px-4 py-2 text-left text-gray-700 font-semibold">
                      Name of Member
                    </th>
                    <th className="border px-4 py-2 text-left text-gray-700 font-semibold">
                      Designation
                    </th>
                    <th className="border px-4 py-2 text-left text-gray-700 font-semibold">
                      Role
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dept.members.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{member.id}</td>
                      <td className="border px-4 py-2">{member.name}</td>
                      <td className="border px-4 py-2">{member.designation}</td>
                      <td className="border px-4 py-2">{member.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctoralResearchCommittee;

const DoctoralResearchCommittee = () => {
  const committeeMembers = [
    {
      id: 1,
      name: "Prof. Girish Kumar",
      designation: "Dean Research",
      role: "Chairperson",
      department: "Research & Development",
      email: "girish.kumar@dseu.ac.in",
    },
    {
      id: 2,
      name: "Prof. Rajesh Sharma",
      designation: "Professor",
      role: "Member",
      department: "Computer Science",
      email: "rajesh.sharma@dseu.ac.in",
    },
    {
      id: 3,
      name: "Prof. Meera Patel",
      designation: "Professor",
      role: "Member",
      department: "Electronics & Communication",
      email: "meera.patel@dseu.ac.in",
    },
    {
      id: 4,
      name: "Prof. Vikram Singh",
      designation: "Professor",
      role: "Member",
      department: "Mechanical Engineering",
      email: "vikram.singh@dseu.ac.in",
    },
    {
      id: 5,
      name: "Prof. Anjali Reddy",
      designation: "Associate Professor",
      role: "Member",
      department: "Civil Engineering",
      email: "anjali.reddy@dseu.ac.in",
    },
    {
      id: 6,
      name: "Prof. Amit Verma",
      designation: "Associate Professor",
      role: "Member",
      department: "Management Studies",
      email: "amit.verma@dseu.ac.in",
    },
  ];

  const responsibilities = [
    "Review and approve research proposals submitted by faculty and students",
    "Monitor the progress of ongoing Ph.D. research work",
    "Ensure compliance with UGC guidelines and university regulations",
    "Conduct periodic reviews and evaluations of research programs",
    "Approve appointment of supervisors and co-supervisors",
    "Recommend policy changes related to research activities",
    "Organize research seminars, workshops, and conferences",
    "Facilitate collaboration with industry and other institutions",
  ];

  return (
    <div className="w-full px-6 md:px-10 py-10 text-gray-800">
      <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-10 text-center">
        Doctoral Research Committee
      </h1>

      {/* Introduction */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-md p-6 mb-10">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">About the Committee</h2>
        <p className="text-gray-700 leading-relaxed">
          The Doctoral Research Committee (DRC) is responsible for overseeing all Ph.D. and research activities
          at the university. The committee ensures adherence to academic standards, research ethics, and
          regulatory compliance. It plays a crucial role in maintaining the quality and integrity of research
          programs.
        </p>
      </div>

      {/* Committee Members */}
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6 text-center">
          Committee Members
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {committeeMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition border border-gray-100"
            >
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-bold text-lg">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-blue-900">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.designation}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-gray-700">
                  <span className="font-semibold">Role:</span> {member.role}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Department:</span> {member.department}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Email:</span>{" "}
                  <a href={`mailto:${member.email}`} className="text-blue-600 hover:underline">
                    {member.email}
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Responsibilities */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Key Responsibilities</h2>
        <ul className="space-y-3">
          {responsibilities.map((responsibility, index) => (
            <li key={index} className="flex items-start">
              <span className="text-blue-600 mr-3 mt-1">✓</span>
              <span className="text-gray-700">{responsibility}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Meeting Schedule */}
      <div className="mt-10 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Meeting Schedule</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="font-semibold text-gray-800">Regular Meetings</p>
            <p className="text-gray-600 text-sm mt-1">First Monday of every month at 2:00 PM</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="font-semibold text-gray-800">Venue</p>
            <p className="text-gray-600 text-sm mt-1">Conference Hall, Block A, Ground Floor</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctoralResearchCommittee;
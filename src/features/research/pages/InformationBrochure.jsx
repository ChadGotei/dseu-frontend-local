const InformationBrochure = () => {
  const programs = [
    {
      id: 1,
      title: "Ph.D. in Computer Science & Engineering",
      duration: "3-6 years",
      seats: 20,
      eligibility: "M.Tech/M.E in CSE/IT with 60% or equivalent CGPA",
      description: "Research areas include AI, Machine Learning, Data Science, Cybersecurity, and Software Engineering.",
    },
    {
      id: 2,
      title: "Ph.D. in Electronics & Communication Engineering",
      duration: "3-6 years",
      seats: 15,
      eligibility: "M.Tech/M.E in ECE with 60% or equivalent CGPA",
      description: "Focus areas include VLSI Design, Signal Processing, Wireless Communication, and Embedded Systems.",
    },
    {
      id: 3,
      title: "Ph.D. in Mechanical Engineering",
      duration: "3-6 years",
      seats: 15,
      eligibility: "M.Tech/M.E in Mechanical Engineering with 60% or equivalent CGPA",
      description: "Research domains include Robotics, Thermal Engineering, Manufacturing, and Design Engineering.",
    },
    {
      id: 4,
      title: "Ph.D. in Civil Engineering",
      duration: "3-6 years",
      seats: 12,
      eligibility: "M.Tech/M.E in Civil Engineering with 60% or equivalent CGPA",
      description: "Areas of specialization include Structural Engineering, Geotechnical Engineering, and Transportation.",
    },
    {
      id: 5,
      title: "Ph.D. in Management Studies",
      duration: "3-6 years",
      seats: 10,
      eligibility: "MBA/M.Com with 55% and NET/SLET qualified",
      description: "Research focus on Organizational Behavior, Finance, Marketing, and Human Resource Management.",
    },
  ];

  const admissionProcess = [
    {
      step: 1,
      title: "Online Application",
      description: "Submit application form through university portal with required documents",
      deadline: "Last week of April",
    },
    {
      step: 2,
      title: "Entrance Examination",
      description: "Written test covering research methodology and subject-specific knowledge",
      deadline: "First week of June",
    },
    {
      step: 3,
      title: "Interview & Presentation",
      description: "Personal interview and research proposal presentation before DRC",
      deadline: "Third week of June",
    },
    {
      step: 4,
      title: "Final Selection",
      description: "Merit list based on entrance test (70%) and interview (30%)",
      deadline: "First week of July",
    },
  ];

  const financialSupport = [
    {
      type: "University Fellowship",
      amount: "₹25,000/month",
      duration: "3 years",
      eligibility: "Merit-based, top 20% candidates",
    },
    {
      type: "Teaching Assistantship",
      amount: "₹20,000/month",
      duration: "3-4 years",
      eligibility: "Available for all admitted students",
    },
    {
      type: "Research Project Funding",
      amount: "Variable",
      duration: "Project duration",
      eligibility: "Based on project requirements",
    },
    {
      type: "Travel Grant",
      amount: "Up to ₹50,000",
      duration: "Per conference",
      eligibility: "For paper presentation at international conferences",
    },
  ];

  return (
    <div className="w-full px-6 md:px-10 py-10 text-gray-800">
      <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-10 text-center">
        Ph.D. Program Information Brochure
      </h1>

      {/* Introduction */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-md p-6 mb-10">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Welcome to DSEU Research Programs</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Delhi Skill and Entrepreneurship University (DSEU) invites applications for admission to
          Ph.D. programs across various disciplines. Our research programs are designed to foster
          innovation, critical thinking, and academic excellence.
        </p>
        <p className="text-gray-700 leading-relaxed">
          The university provides state-of-the-art research facilities, experienced faculty, and
          a conducive environment for scholarly pursuits. We encourage interdisciplinary research
          and collaboration with industry partners.
        </p>
      </div>

      {/* Programs Offered */}
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6 text-center">
          Programs Offered
        </h2>
        <div className="space-y-6">
          {programs.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition border-l-4 border-blue-600"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                <h3 className="text-xl font-bold text-blue-900 mb-2 md:mb-0">
                  {program.title}
                </h3>
                <span className="inline-block px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                  {program.seats} Seats
                </span>
              </div>
              <p className="text-gray-700 mb-4">{program.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-gray-700">Duration:</span>{" "}
                  <span className="text-gray-600">{program.duration}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Eligibility:</span>{" "}
                  <span className="text-gray-600">{program.eligibility}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Admission Process */}
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6 text-center">
          Admission Process
        </h2>
        <div className="space-y-4">
          {admissionProcess.map((process) => (
            <div
              key={process.step}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                  {process.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-blue-900 mb-2">{process.title}</h3>
                  <p className="text-gray-700 mb-2">{process.description}</p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Deadline:</span> {process.deadline}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Financial Support */}
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6 text-center">
          Financial Support & Scholarships
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {financialSupport.map((support, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-md p-6 border border-blue-100"
            >
              <h3 className="text-lg font-bold text-blue-900 mb-3">{support.type}</h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-700">
                  <span className="font-semibold">Amount:</span> {support.amount}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Duration:</span> {support.duration}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Eligibility:</span> {support.eligibility}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-gray-800 mb-2">Dean Research Office</h3>
            <p className="text-gray-700 text-sm">
              <span className="font-semibold">Email:</span> research@dseu.ac.in<br />
              <span className="font-semibold">Phone:</span> +91-11-23456789<br />
              <span className="font-semibold">Location:</span> Block A, Room 210
            </p>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 mb-2">Office Hours</h3>
            <p className="text-gray-700 text-sm">
              Monday - Friday: 9:00 AM - 5:00 PM<br />
              Saturday: 9:00 AM - 1:00 PM<br />
              Sunday: Closed
            </p>
          </div>
        </div>
      </div>

      {/* Download Section */}
      <div className="mt-10 text-center">
        <a
          href="/phd_information_brochure.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-semibold"
        >
          Download Complete Brochure (PDF)
        </a>
      </div>
    </div>
  );
};

export default InformationBrochure;
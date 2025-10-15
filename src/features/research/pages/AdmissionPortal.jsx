const AdmissionPortal = () => {
  const [activeTab, setActiveTab] = React.useState("apply");

  const steps = [
    {
      step: 1,
      title: "Registration",
      description: "Create your account on the admission portal",
      status: "completed",
    },
    {
      step: 2,
      title: "Fill Application",
      description: "Complete the application form with all required details",
      status: "completed",
    },
    {
      step: 3,
      title: "Upload Documents",
      description: "Upload scanned copies of required documents",
      status: "current",
    },
    {
      step: 4,
      title: "Pay Fees",
      description: "Pay application fee through online payment gateway",
      status: "pending",
    },
    {
      step: 5,
      title: "Submit",
      description: "Submit your application for review",
      status: "pending",
    },
  ];

  const requiredDocuments = [
    {
      name: "Master's Degree Certificate",
      format: "PDF",
      maxSize: "2 MB",
      required: true,
    },
    {
      name: "Master's Degree Marksheet",
      format: "PDF",
      maxSize: "2 MB",
      required: true,
    },
    {
      name: "Bachelor's Degree Certificate",
      format: "PDF",
      maxSize: "2 MB",
      required: true,
    },
    {
      name: "Bachelor's Degree Marksheet",
      format: "PDF",
      maxSize: "2 MB",
      required: true,
    },
    {
      name: "Research Proposal",
      format: "PDF",
      maxSize: "5 MB",
      required: true,
    },
    {
      name: "No Objection Certificate (if employed)",
      format: "PDF",
      maxSize: "1 MB",
      required: false,
    },
    {
      name: "Category Certificate (if applicable)",
      format: "PDF",
      maxSize: "1 MB",
      required: false,
    },
    {
      name: "Passport Size Photograph",
      format: "JPG/PNG",
      maxSize: "500 KB",
      required: true,
    },
  ];

  const importantDates = [
    { event: "Application Form Available", date: "January 15, 2025" },
    { event: "Last Date for Application Submission", date: "March 31, 2025" },
    { event: "Last Date for Fee Payment", date: "April 5, 2025" },
    { event: "Admit Card Release", date: "May 15, 2025" },
    { event: "Entrance Examination", date: "June 5, 2025" },
    { event: "Interview & Presentation", date: "June 20-25, 2025" },
    { event: "Result Declaration", date: "July 5, 2025" },
    { event: "Admission & Registration", date: "July 15-20, 2025" },
  ];

  return (
    <div className="w-full px-6 md:px-10 py-10 text-gray-800">
      <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-10 text-center">
        Ph.D. Admission Portal
      </h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 justify-center mb-10 border-b border-gray-200 pb-4">
        <button
          onClick={() => setActiveTab("apply")}
          className={`px-6 py-2 rounded-lg font-medium transition ${
            activeTab === "apply"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Apply Now
        </button>
        <button
          onClick={() => setActiveTab("dates")}
          className={`px-6 py-2 rounded-lg font-medium transition ${
            activeTab === "dates"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Important Dates
        </button>
        <button
          onClick={() => setActiveTab("status")}
          className={`px-6 py-2 rounded-lg font-medium transition ${
            activeTab === "status"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Check Status
        </button>
      </div>

      {/* Apply Now Tab */}
      {activeTab === "apply" && (
        <div className="space-y-8">
          {/* Application Steps */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Application Process</h2>
            <div className="space-y-4">
              {steps.map((step) => (
                <div key={step.step} className="flex items-start">
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg mr-4 ${
                      step.status === "completed"
                        ? "bg-green-500 text-white"
                        : step.status === "current"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {step.status === "completed" ? "✓" : step.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Required Documents */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Required Documents</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Document</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Format</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Max Size</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Required</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {requiredDocuments.map((doc, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-700">{doc.name}</td>
                      <td className="px-4 py-3 text-center text-sm text-gray-600">{doc.format}</td>
                      <td className="px-4 py-3 text-center text-sm text-gray-600">{doc.maxSize}</td>
                      <td className="px-4 py-3 text-center">
                        {doc.required ? (
                          <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded">
                            Required
                          </span>
                        ) : (
                          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded">
                            Optional
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Application Fee */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Application Fee</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm text-gray-600 mb-1">General Category</p>
                <p className="text-2xl font-bold text-blue-900">₹2,000</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm text-gray-600 mb-1">OBC Category</p>
                <p className="text-2xl font-bold text-blue-900">₹1,500</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm text-gray-600 mb-1">SC/ST/PwD</p>
                <p className="text-2xl font-bold text-blue-900">₹1,000</p>
              </div>
            </div>
          </div>

          {/* Apply Button */}
          <div className="text-center">
            <a
              href="https://dseuadm.samarth.edu.in/phd"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-semibold text-lg"
            >
              Apply Now →
            </a>
          </div>
        </div>
      )}

      {/* Important Dates Tab */}
      {activeTab === "dates" && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Important Dates for Ph.D. Admission 2025-26</h2>
          <div className="space-y-4">
            {importantDates.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                    {index + 1}
                  </div>
                  <span className="text-gray-800 font-medium">{item.event}</span>
                </div>
                <span className="text-gray-600 font-semibold">{item.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Check Status Tab */}
      {activeTab === "status" && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Check Application Status</h2>
          <p className="text-gray-700 mb-6">
            Enter your application number and date of birth to check the status of your application.
          </p>
          <div className="max-w-md mx-auto space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Application Number
              </label>
              <input
                type="text"
                placeholder="Enter your application number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
              Check Status
            </button>
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="mt-10 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Need Help?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-gray-800 mb-2">Technical Support</h3>
            <p className="text-gray-700 text-sm">
              <span className="font-semibold">Email:</span> support@dseu.ac.in<br />
              <span className="font-semibold">Phone:</span> +91-11-23456789<br />
              <span className="font-semibold">Hours:</span> 9:00 AM - 6:00 PM (Mon-Sat)
            </p>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 mb-2">Admission Queries</h3>
            <p className="text-gray-700 text-sm">
              <span className="font-semibold">Email:</span> research@dseu.ac.in<br />
              <span className="font-semibold">Phone:</span> +91-11-23456790<br />
              <span className="font-semibold">Hours:</span> 9:00 AM - 5:00 PM (Mon-Fri)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionPortal;
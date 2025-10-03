const Ordinance = () => {
  const ordinanceSections = [
    {
      title: "Introduction",
      content:
        "The Research Ordinance outlines the regulations and procedures governing Ph.D. and research programs at the university. These ordinances are binding on all registered scholars, supervisors, and faculty.",
    },
    {
      title: "Eligibility & Admission Rules",
      content:
        "Candidates must hold a Master's degree with a minimum of 55% marks (or equivalent CGPA). Admission is through an entrance test followed by an interview, as per UGC guidelines.",
    },
    {
      title: "Coursework Regulations",
      content:
        "All Ph.D. scholars are required to complete coursework of at least 8–12 credits, including Research Methodology and subject-specific electives. Minimum 75% attendance is mandatory.",
    },
    {
      title: "Research Progress & Evaluation",
      content:
        "Each scholar must present progress reports annually before the Research Advisory Committee. Unsatisfactory progress may result in termination of registration.",
    },
    {
      title: "Supervision Rules",
      content:
        "A supervisor may guide a maximum of 8 Ph.D. scholars at any given time. Co-supervisors can be appointed in interdisciplinary research.",
    },
    {
      title: "Thesis Submission & Evaluation",
      content:
        "The minimum duration for submission is 3 years, and the maximum is 6 years. All theses must pass plagiarism checks and be evaluated by two external experts.",
    },
    {
      title: "Code of Ethics",
      content:
        "The university follows strict anti-plagiarism policies. All scholars must adhere to ethical practices in research, including obtaining necessary clearances for human/animal research.",
    },
    {
      title: "Award of Degree",
      content:
        "The Ph.D. degree shall be awarded upon successful viva-voce examination and approval by the Academic Council.",
    },
  ];

  return (
    <div className="px-6 md:px-16 py-10 text-gray-800">
      <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-10 text-center">
        Research Ordinance
      </h1>

      <div className="space-y-8">
        {ordinanceSections.map((section, idx) => (
          <div
            key={idx}
            className="bg-white border rounded-lg shadow-md p-6 hover:shadow-lg transition"
          >
            <h2 className="text-xl md:text-2xl font-bold text-blue-700 mb-3">
              {section.title}
            </h2>
            <p className="text-gray-600 leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>

      {/* Demo for linking ordinance PDF */}
      <div className="mt-12 text-center">
        <a
          href="/ordinance_phd.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Download Full Ordinance (PDF)
        </a>
      </div>
    </div>
  );
};

export default Ordinance;

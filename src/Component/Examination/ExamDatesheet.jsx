import HeadingText from "../Reusable/HeadingText";

const demoData = [
  {
    title: "Datesheet: B.Tech Semester VI (Nov 2025 Exams) (test only)",
    fileLink: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    createdAt: new Date(Date.now() - 1 * 86400000),
  },
  {
    title: "Datesheet: Diploma in ECE (Nov 2025) (test only)",
    fileLink: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    createdAt: new Date(Date.now() - 2 * 86400000),
  },
  {
    title: "Datesheet: BCA Semester V (Nov 2025) (test only)",
    fileLink: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    createdAt: new Date(Date.now() - 3 * 86400000),
  }
];

const ExamDatesheet = () => (
  <div>
    <HeadingText heading="Examination Datesheet" headingCN="text-blue-900 mb-6" />
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      <div className="flex justify-between bg-blue-900 text-white font-semibold px-6 py-3">
        <div className="flex-1">Title / Datesheet</div>
        <div className="w-40 text-right">Uploading Date</div>
      </div>
      <div className="divide-y divide-gray-200">
        {demoData.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center px-6 py-3 hover:bg-blue-50 transition">
            <a
              href={item.fileLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline flex-1 pr-2"
            >
              {item.title}
            </a>
            <div className="w-40 text-right text-gray-700">
              {item.createdAt.toLocaleDateString("en-IN")}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ExamDatesheet;

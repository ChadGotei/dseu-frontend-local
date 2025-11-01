// src/constants/examinationData.js

export const examinationNav = [
  { label: "Notices", key: "exam notices" },
  { label: "Results", key: "exam results" },
  { label: "Datesheet", key: "exam datesheet" },
  {
    label: "Fee Links",
    key: "exam fee-link",
  },
];

// Demo content (as if fetched)
export const examinationData = {
  notices: [
    {
      title: "Revaluation Form Submission for Nov 2025 Exams",
      fileLink: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      createdAt: new Date(Date.now() - 1 * 86400000),
    },
    {
      title: "Examination Hall Tickets Released",
      fileLink: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      createdAt: new Date(Date.now() - 3 * 86400000),
    },
  ],
  results: [
    {
      title: "B.Tech (CSE) Semester VI - May 2025",
      fileLink: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      createdAt: new Date(Date.now() - 2 * 86400000),
    },
    {
      title: "BCA Semester IV - May 2025",
      fileLink: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      createdAt: new Date(Date.now() - 4 * 86400000),
    },
  ],
  datesheet: [
    {
      title: "B.Tech Semester VI (Nov 2025 Exams)",
      fileLink: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      createdAt: new Date(Date.now() - 1 * 86400000),
    },
    {
      title: "Diploma in ECE (Nov 2025)",
      fileLink: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      createdAt: new Date(Date.now() - 2 * 86400000),
    },
  ],
  "fee-link": [
    {
      title: "Issue of Provisional/Migration Fee Portal",
      fileLink: "https://eazypay.icicibank.com/eazypayLink?P1=iHSKEXeO8j51e9k+lFEY3w==",
      createdAt: new Date(Date.now() - 2 * 86400000)
    },
  ],
};

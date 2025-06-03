import React from "react";

const portals = [
  {
    id: "diploma",
    text: "Diploma Admissions: Registration of courses after",
    bolded: "class X",
    including: false,
    link: "https://dseuadm.samarth.edu.in",
    cta: "Visit Portal",
    ctaColor: "blue",
  },
  {
    id: "ug",
    text: "UG Admissions: Registration of courses after",
    bolded: "class XII",
    including: "(including B.Tech)",
    link: "https://dseuadm.samarth.edu.in/ug",
    cta: "Visit Portal",
    ctaColor: "blue",
  },
  {
    id: "pg",
    text: "PG Admissions: Registration of courses after",
    bolded: "UG",
    including: false,
    link: "https://dseuadm.samarth.edu.in/pg",
    cta: "Visit Portal",
    ctaColor: "blue",
  },
  {
    id: "ib",
    text: "Download the latest",
    bolded: "Information Bulletin 2025",
    including: "for complete admission and program details",
    link: "https://drive.google.com/file/d/1JbSp7w_g2fcSTNzIRVcaBYN_JlAaWBOw/view",
    cta: "View PDF",
    ctaColor: "orange",
    bluetin: true, 
  },
];

const AdmissionPage = () => {
  return (
    <main className="flex flex-col mt-8 md:mt-12 md:mb-10 mb-16 justify-center items-center w-full max-w-3xl gap-4 sm:gap-6 md:gap-8 mx-auto">
      {/* Heading */}
      <div className="text-center">
        <h2 className="text-[1.8rem] md:text-[2.4rem] font-bold text-[#222] tracking-wide">
          Admission Cycle 2025-26
        </h2>
        <div className="flex items-center justify-center mt-2 w-[150px] mx-auto">
          <div className="h-[3px] bg-blue-700 md:flex-1 w-[20px]"></div>
          <div className="h-[6px] w-[40px] md:w-[60px] bg-blue-900 rounded-full mx-2"></div>
          <div className="h-[3px] bg-blue-700 md:flex-1 w-[20px]"></div>
        </div>
      </div>

      {/* Cards */}
      <div className="w-full p-5 space-y-4">
        {portals.map(
          ({ id, text, bolded, including, link, cta, ctaColor, bluetin }) => (
            <div
              key={id}
              className="border-l-[3px] border-blue-600 bg-gray-50 p-5 shadow-sm rounded-lg hover:shadow-md transition-all duration-300"
            >
              <div className="flex justify-between items-center">
                <p className="text-sm sm:text-base font-medium text-gray-800">
                  {text} <span className="font-bold">{bolded}</span>
                  {including && <span> {including}</span>}
                </p>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`ml-4 bg-${ctaColor}-600 hover:bg-${ctaColor}-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors duration-200 whitespace-nowrap`}
                >
                  {cta}
                </a>
              </div>
              {!bluetin && (
                <div className="mt-2">
                  <span className="text-sm font-medium text-gray-700 mr-1">
                    Registration Link:
                  </span>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm font-medium hover:underline break-all"
                  >
                    {link}
                  </a>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </main>
  );
};

export default AdmissionPage;

import cofImage from "../../assets/team-dseu/gagandhawan.jpg";

export const teamData = [
  {
    name: "Prof. (Dr.) Gagan Dhawan",
    designation: "Controller of Finance",
    university: "Delhi Skill and Entrepreneurship University",
    image: cofImage,
    profileSummary: `
      Prof. Dr. Gagan Dhawan completed his graduation and post-graduation at the University of Delhi, India. He received the Universitas 21 Fellowship for a Master’s in Bioinformatics at the University of Edinburgh, UK, and the UGC-Raman Award for postdoctoral research at the University of Massachusetts, Boston, USA. He is a Fellow of the Indian Chemical Society (FICS), Chartered Chemist (CChem), and Fellow of the Royal Society of Chemistry (FRSC), UK. Recognized for teaching excellence, he received the Meritorious Teacher Award (2014) and INSA Teachers Award (2020). He serves as a Council Member at the National Commission for Allied and Healthcare Professions (NCAHP), under the Ministry of Health and Family Welfare, Government of India. His research focuses on novel small-molecule inhibitors and natural polymer based smart self-assembled nanostructures for biomedical applications.
    `,
    messageToStudents:
      "Education is more than knowledge; it's the ability to create change. DSEU empowers learners with the skills, confidence, and mindset to tackle challenges and shape a better society.",
  },
];

const COF = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-10 py-12 text-gray-800">
      {teamData.map((member, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row items-start gap-10"
        >
          <div className="w-full md:w-[40%] bg-white shadow-sm rounded-2xl p-6 md:p-8 border border-gray-100">
            <div className="flex flex-col items-center text-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-48 h-48 rounded-full object-cover shadow-sm mb-4"
              />
              <h1 className="text-2xl font-semibold text-gray-800">
                {member.name}
              </h1>
              <h2 className="text-base text-blue-500 mt-1">
                {member.designation}
              </h2>
              <p className="text-sm italic text-gray-500 mt-1 text-center">
                {member.university}
              </p>
            </div>
          </div>

          <div className="w-full md:w-2/3 space-y-10">
            <section>
              <h3 className="text-lg font-semibold text-blue-600 mb-2 uppercase tracking-wide">
                Profile Summary
              </h3>
              <p className="leading-relaxed text-justify">
                {member.profileSummary}
              </p>
            </section>

            {/* <section>
              <h3 className="text-lg font-semibold text-blue-600 mb-2 uppercase tracking-wide">
                Academic Background
              </h3>
              <p className="leading-relaxed text-justify">
                {member.academicBackground}
              </p>
            </section> */}

            <section className="border-l-4 border-blue-500 pl-4">
              <p className="text-base italic text-orange-400 font-medium text-justify">
                “{member.messageToStudents}”
              </p>
            </section>
          </div>
        </div>
      ))}
    </div>
  );
};

export default COF;

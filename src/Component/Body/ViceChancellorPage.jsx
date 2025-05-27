import { VCINFO } from "../../constants/VCINFO.JS";
import { vicechancellor } from "../../assets/team-dseu";

const ViceChancellorPage = () => {
  const {
    name,
    designation,
    university,
    profileSummary,
    academicBackground,
    messageToStudents,
  } = VCINFO;

  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-10 py-12 text-gray-800">
      <div className="flex flex-col md:flex-row items-start gap-10">
        <div className="w-full md:w-1/3 bg-white shadow-sm rounded-2xl p-6 md:p-8 border border-gray-100">
          <div className="flex flex-col items-center text-center">
            <img
              src={vicechancellor}
              alt={name}
              className="w-36 h-36 rounded-full object-cover shadow-sm mb-4"
            />
            <h1 className="text-2xl font-semibold text-gray-800">{name}</h1>
            <h2 className="text-base text-blue-500 mt-1">{designation}</h2>
            <p className="text-sm italic text-gray-500 mt-1 text-center">
              {university}
            </p>
          </div>
        </div>

        <div className="w-full md:w-2/3 space-y-10">
          <section>
            <h3 className="text-lg font-semibold text-blue-600 mb-2 uppercase tracking-wide">
              Profile Summary
            </h3>
            <p className="leading-relaxed text-justify">{profileSummary}</p>
          </section>

          <section className="border-l-4 border-blue-500 pl-4">
            <p className="text-base italic text-orange-400 font-medium text-justify">
              “{messageToStudents}”
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ViceChancellorPage;

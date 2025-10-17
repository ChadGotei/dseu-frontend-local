import { girishKumar, parvathyUnnikrishan } from "../../../assets/team-dseu";

const deanPhoto = girishKumar
const arPhoto = parvathyUnnikrishan

const OfficeBearers = () => {
  return (
    <div className="w-full px-6 md:px-10 py-10 flex flex-col items-center text-gray-800">
      <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-10 text-center">
        Office Bearers
      </h1>

      {/* Dean Research Card */}
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center max-w-4xl w-full mb-8">
        {/* Photo */}
        <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
          <img
            src={deanPhoto}
            alt="Dean Research"
            className="w-40 h-40 rounded-full object-cover shadow-md border border-gray-200"
          />
        </div>

        {/* Profile Info */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-blue-700">
            Prof. Girish Kumar
          </h2>
          <p className="text-gray-600 font-medium mt-1">Dean Research</p>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Prof. Girish Kumar has been actively engaged in research and
            academic administration. His areas of interest include
            <span className="font-semibold">
              {" "}
              research policy, innovation, and interdisciplinary studies
            </span>
            . He has published several papers and guided numerous research
            scholars.
          </p>

          <ul className="mt-4 space-y-2 text-gray-600 text-sm">
            <li>
              <span className="font-semibold">Email:</span>{" "}
              girish.kumar@dseu.ac.in
            </li>
            <li>
              <span className="font-semibold">Office:</span> Block A, Room 210
            </li>
          </ul>
        </div>
      </div>

      {/* AR Research Card */}
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center max-w-4xl w-full">
        {/* Photo */}
        <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
          <img
            src={arPhoto}
            alt="AR Research"
            className="w-40 h-40 rounded-full object-cover shadow-md border border-gray-200"
          />
        </div>

        {/* Profile Info */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-blue-700">Ms. Parvathy Unnikrishnan</h2>
          <p className="text-gray-600 font-medium mt-1">Assistant Registrar (Research)</p>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Dr. Parvath has been contributing significantly to the development
            and coordination of research activities. She supports academic
            research initiatives, policy implementation, and research data
            management at DSEU.
          </p>

          <ul className="mt-4 space-y-2 text-gray-600 text-sm">
            <li>
              <span className="font-semibold">Email:</span>{" "}
              Parvathy.Unnikrishnan@dseu.ac.in
            </li>
            <li>
              <span className="font-semibold">Office:</span> Block A, Room 208
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OfficeBearers;

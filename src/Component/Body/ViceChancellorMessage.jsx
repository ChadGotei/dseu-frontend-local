import VCsir from "../../assets/VCsir.jpg";

const ViceChancellorMessage = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 font-sans">

      <h2 className="text-4xl font-bold text-blue-600 mb-2 text-center md:text-left">
        Welcome to DSEU
      </h2>
      <p className="text-orange-400 font-pacifico font-bold text-lg md:text-xl mb-10 text-center md:text-left">
        — Crafting Excellence
      </p>

      <div className="flex md:flex-row md:items-center md:gap-10 mb-10 flex-col gap-5 mx-auto">
        <div className="w-40 h-40 rounded-2xl overflow-hidden shadow-md mx-auto md:mx-0">
          <img
            src={VCsir}
            alt="Vice Chancellor"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-semibold text-gray-900 mb-1">
            Professor Ashok Kumar Nagawat
          </h3>
          <p className="text-blue-600 font-medium text-md">
            Vice Chancellor, DSEU
          </p>
        </div>
      </div>

      <h4 className="text-[1.3rem] whitespace-nowrap md:text-2xl font-semibold text-gray-700 mb-2 text-center md:text-left">
        Message from the Vice Chancellor
      </h4>
      <div className="md:w-[400px] w-100px h-1 bg-orange-400 rounded-full mb-8 md:mb-6 mx-auto md:mx-0 animate-pulse" />

      <div className="space-y-5 text-[16px] md:text-[17px] text-gray-800 leading-relaxed text-justify">
        <p>
          Prof. Ashok Kumar Nagawat is an accomplished academic leader, theoretical physicist, and higher education reformer with 44 years of experience in teaching, research, and university governance. A Ph.D. in Theoretical High Energy Physics, his work on physics beyond the Standard Model has gained international recognition.
        </p>
        <p>
          Before joining DSEU, he held key leadership roles at the University of Rajasthan and Rajasthan ILD Skills University, pioneering interdisciplinary education as the architect of the Centre for Converging Technologies—integrating nanotechnology, biotechnology, IT, and cognitive sciences. He has designed innovative programs, and created flagship centres, while driving academic reforms, technology initiatives and policy formulations.
        </p>
        <p>
          As Vice Chancellor of DSEU, he now champions a transformative vision, integrating academic excellence with employability and entrepreneurship, leveraging his expertise in STEM, converging technologies, and skill-based education to position DSEU as a national leader in skill and entrepreneurial learning.
        </p>
      </div>
    </div>
  );
};

export default ViceChancellorMessage;

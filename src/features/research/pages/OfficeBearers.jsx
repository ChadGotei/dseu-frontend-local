import { officeBearers } from "../data/officeBearers";

const OfficeBearers = () => {
  return (
    <div className="w-full px-6 md:px-10 py-10 flex flex-col items-center text-gray-800">
      <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-10 text-center">
        Office Bearers
      </h1>

      {officeBearers.map((person, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center max-w-4xl w-full mb-8 last:mb-0"
        >
          {/* Photo */}
          <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
            <img
              src={person.photo}
              alt={person.name}
              className="w-40 h-40 rounded-full object-cover shadow-md border border-gray-200"
            />
          </div>

          {/* Profile Info */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-blue-700">{person.name}</h2>
            <p className="text-gray-600 font-medium mt-1">{person.title}</p>
            <p className="mt-4 text-gray-700 leading-relaxed">{person.description}</p>

            <ul className="mt-4 space-y-2 text-gray-600 text-sm">
              <li>
                <span className="font-semibold">Email:</span> {person.email}
              </li>
              <li>
                <span className="font-semibold">Office:</span> <span className="text-blue-600">{person.office}
                </span>
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OfficeBearers;

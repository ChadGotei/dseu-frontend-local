import { Download } from "lucide-react";

const data = [
  {
    text: "Delhi Skill and Entrepreneurship University First Statutes",
    path: "/statutes/Delhi Skill and Entrepreneurship University First Statutes.pdf"
  },
  {
    text: "Delhi Skill and Entrepreneurship University Act-2019",
    path: "/statutes/Delhi Skill and Entrepreneurship University Act-2019.pdf"
  }
];

const Statutes = () => {
  return (
    <div className="mb-10">
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-center md:text-left text-[#333]">
        Statutes, University Act, Ordinances
      </h2>

      <hr className="mb-6 border-gray-300" />

      <ul className="space-y-4 max-h-[60vh] overflow-y-auto custom-scroll pr-1">
        {data.map((item, index) => (
          <li
            key={index}
            className="bg-white border border-gray-200 rounded-md shadow-sm p-3 flex flex-row items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span className="text-blue-600 text-lg">»</span>
              <a
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-900 underline hover:text-blue-700 text-sm md:text-base break-words max-w-full"
              >
                {item.text}
              </a>
            </div>
            <div className="mt-2 sm:mt-0 sm:ml-4 flex justify-end">
              <a
                href={item.path}
                download
                onClick={(e) => e.stopPropagation()}
                className="hover:text-blue-600"
              >
                <Download className="w-5 h-5 text-gray-400 hover:text-blue-600 transition" />
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Statutes;

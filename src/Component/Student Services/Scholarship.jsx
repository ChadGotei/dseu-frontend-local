import { motion } from "framer-motion";
import { data } from "../../constants/SCHOLARSHIP.JS";
import HeadingText from "../Reusable/HeadingText";

const Scholarship = () => {
  return (
    <div className="w-full bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-gray-800">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <HeadingText
            heading="Scholarship"
            headingCN="text-3xl md:text-5xl font-extrabold text-center mb-2 text-gray-900"
          />
          <p className="text-sm md:text-lg text-gray-600 mt-4 md:mt-6 text-justify leading-relaxed">
            {data.introduction}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h3 className="text-xl md:text-2xl font-bold text-center text-gray-800 border-b-4 border-orange-400 pb-3 shadow-sm w-fit mb-1">
          Scholarship Philosophy
        </h3>
          <p className="text-sm md:text-lg text-gray-600 mt-4 md:mt-6 text-justify leading-relaxed">
            {data.philosophy}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10"
        >
          <h3 className="text-xl md:text-2xl font-bold text-center text-gray-800 border-b-4 border-orange-400 pb-3 shadow-sm w-fit mb-1">
          Scholarship Opportunities
        </h3>

          <div className="rounded-xl overflow-hidden border border-gray-200 shadow mt-8">
            <table className="w-full text-sm md:text-base text-left text-gray-800">
              <thead className="bg-blue-100 text-gray-900 uppercase">
                <tr>
                  <th className="px-6 py-4 border-b border-gray-300">S.No</th>
                  <th className="px-6 py-4 border-b border-gray-300">Name</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {data.table.map((table, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-100 hover:bg-blue-50 transition duration-200"
                  >
                    <td className="px-6 py-4">{table.id}</td>
                    <td className="px-6 py-4">{table.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-sm md:text-base text-gray-700 text-center">
            {data.details[0].content}{" "}
            <a
              href={data.details[0].path}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-medium underline hover:text-blue-800 transition"
            >
              Click here
            </a>
            .
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Scholarship;

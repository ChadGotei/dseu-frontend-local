import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react"; 
import HeadingText from "../Reusable/HeadingText";
import { eocData } from "../../constants/EOC.JS";


const EqualOpportunity = () => {
  return (
    <div className="w-full">
      <div className="max-w-5xl mx-auto px-6 py-12 text-gray-800">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <HeadingText
            heading="Equal Opportunity Cell"
            headingCN="text-2xl md:text-5xl font-bold  text-center mb-3"
          />
          <p className="text-xs md:text-lg text-gray-600 mt-4 text-justify leading-relaxed">
            {eocData.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-4"
        >
          <h4 className="text-xl md:text-2xl font-bold text-center text-gray-800 border-b-4 border-orange-400 pb-3 shadow-sm w-fit mb-4">Functions & Responsibilities</h4>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 space-y-6 text-gray-700 text-xs md:text-base leading-relaxed"
        >
          {eocData.objectives.map((point, index) => (
            <li
              key={index}
              className="flex items-start gap-3 list-none text-justify p-4 bg-white rounded-2xl shadow-md"
            >
              {/* Modern styled arrow indicator - same as previous components */}
              <div className="flex-shrink-0 h-6 w-6 mt-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <ChevronRight className="w-4 h-4" />
              </div>
              <span>{point}</span>
            </li>
          ))}
        </motion.ul>


        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-xs md:text-lg text-gray-600 mt-10 text-justify leading-relaxed"
        >
          {eocData.commitment}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-5"
      >
        <div className="max-w-5xl mx-auto px-6">
        <h4 className="text-xl md:text-2xl font-bold text-center text-gray-800 border-b-4 border-orange-400 pb-3 shadow-sm w-fit mb-4">EOC Members</h4>

          <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm mt-6 mb-6">
            <table className="w-full text-xs md:text-base text-left text-gray-700">
              <thead className="bg-blue-50 text-gray-800">
                <tr>
                  <th className="px-4 py-3 border-b border-gray-200">S.No</th>
                  <th className="px-4 py-3 border-b border-gray-200">Name</th>
                  <th className="px-4 py-3 border-b border-gray-200">Role</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {eocData.members.map((member, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{member.name}</td>
                    <td className="px-4 py-3">{member.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EqualOpportunity;
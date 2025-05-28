import { motion } from "framer-motion";
import { BarChart2, BookOpen, FileText, ChevronRight } from "lucide-react"; 
import HeadingText from "../Reusable/HeadingText";

const IQAC = () => {
  return (
    <div className="w-full bg-white text-gray-800 py-10 px-6">
      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <HeadingText
            heading="Internal Quality Assurance Cell (IQAC)"
            headingCN="text-2xl md:text-4xl font-bold mb-3"
          />

          <p className="mt-7 text-sm md:text-base text-justify leading-relaxed text-gray-700">
            The Internal Quality Assurance Cell (IQAC) is established to develop a system for
            conscious, consistent and catalytic improvement in the overall performance of the institution.
            The IQAC works towards the enhancement of academic and administrative performance and promotes
            quality initiatives across all departments.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10"
        >
          <h4 className="text-xl md:text-2xl font-bold text-center text-gray-800 border-b-4 border-orange-400 pb-3 shadow-sm w-fit mb-4">Objectives of IQAC</h4>

          <ul className="space-y-3 text-sm md:text-base text-gray-700">
            {/* Modern styled list items with gradient arrow indicators */}
            <li className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 mt-0.5 mr-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white">
                <ChevronRight className="w-4 h-4" />
              </div>
              <span>To ensure continuous improvement in academic and administrative processes.</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 mt-0.5 mr-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white">
                <ChevronRight className="w-4 h-4" />
              </div>
              <span>To promote innovative practices for holistic development.</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 mt-0.5 mr-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white">
                <ChevronRight className="w-4 h-4" />
              </div>
              <span>To encourage feedback mechanisms and data-driven decision making.</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 mt-0.5 mr-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white">
                <ChevronRight className="w-4 h-4" />
              </div>
              <span>To maintain institutional quality benchmarks and best practices.</span>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12"
        >
          <h4 className="text-xl md:text-2xl font-bold text-center text-gray-800 border-b-4 border-orange-400 pb-3 shadow-sm w-fit mb-4">IQAC Functions</h4>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-10 rounded-xl shadow-lg">
              <BarChart2 className="w-20 h-20 text-blue-600 mb-4" />
              <p className="font-semibold text-sm md:text-base">
                Develop and apply <br /> quality benchmarks
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-10 rounded-xl shadow-lg">
              <BookOpen className="w-20 h-20 text-blue-600 mb-4" />
              <p className="font-semibold text-sm md:text-base">
                Promote learning<br /> focused environment
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-10 rounded-xl shadow-lg">
              <FileText className="w-20 h-20 text-blue-600 mb-4" />
              <p className="font-semibold text-sm md:text-base">
                Document and share <br /> quality improvements
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12"
        >
          <h4 className="text-xl md:text-2xl font-bold text-center text-gray-800 border-b-4 border-orange-400 pb-3 shadow-sm w-fit mb-4">Contact IQAC</h4>
          <p className="text-sm md:text-base text-gray-700">
            For queries, suggestions, or collaborations, reach out to the head of the committee –{" "}
            <a
              href="https://dseuacin-one.vercel.app/faculty/67fcb6a3594afd76950ae309"
              className="text-blue-500 hover:text-blue-700 font-regular"
            >
              <span className="inline-block hover:underline">Prof. Kamna Sachdeva</span>
            
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default IQAC;
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import HeadingText from "../Reusable/HeadingText";
import { antiRagging } from "../../constants/ANTIRAGGING.JS";

const AntiRagging = () => {
  return (
    <div className="w-full">
      <div className="max-w-5xl mx-auto px-6 py-12 text-gray-800">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <HeadingText
            heading="Anti-Ragging Policy"
            headingCN="text-3xl md:text-5xl font-bold mb-3 text-center"
          />
          <p className="text-sm md:text-lg text-gray-600 mt-4 text-justify leading-relaxed">
            {antiRagging.introText}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-4"
        >
        <h4 className="text-xl md:text-2xl font-bold text-center text-gray-800 border-b-4 border-orange-400 pb-3 shadow-sm w-fit mb-4">What is Ragging?</h4>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 space-y-6 text-gray-700 text-sm md:text-base leading-relaxed"
        >
          {antiRagging.whatIsRagging.map((point, index) => (
            <li
              key={index}
              className="flex items-start gap-3 list-none text-justify p-4 bg-white rounded-2xl shadow-md"
            >
              <ArrowRight className="text-red-500 w-5 h-5 mt-1" />
              <span>{point}</span>
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12"
        >
          <h4 className="text-xl md:text-2xl font-bold text-center text-gray-800 border-b-4 border-orange-400 pb-3 shadow-sm w-fit mb-4">Actions against Ragging</h4>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 space-y-6 text-gray-700 text-sm md:text-base leading-relaxed"
        >
          {antiRagging.actionsAgainstRagging.map((action, index) => (
            <li
              key={index}
              className="flex items-start gap-3 list-none text-justify p-4 bg-white rounded-2xl shadow-md"
            >
              <ArrowRight className="text-green-500 w-5 h-5 mt-1" />
              <span>{action}</span>
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12"
        >
          <h4 className="text-xl md:text-2xl font-bold text-center text-gray-800 border-b-4 border-orange-400 pb-3 shadow-sm w-fit mb-4">Forms & Notices</h4>
        </motion.div>

        <div className="mt-6 flex flex-col md:flex-row md:flex-wrap md:gap-12 gap-4 text-gray-700 text-sm md:text-base">
          {antiRagging.pdfLinks.map((pdf, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="flex items-center gap-2"
            >
              <ArrowRight className="text-blue-500 w-5 h-5" />
              <a
                href={pdf.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {pdf.name}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AntiRagging;

import { motion } from "framer-motion";
import { ArrowRightCircle } from "lucide-react";

import HeadingText from "../Reusable/HeadingText";

import {
  mission,
  vision,
  keyPrincipals,
} from "../../constants/VISION&MISSION.JS";

const VisionMission = () => {
  const sections = [vision, mission, keyPrincipals];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-gray-800 text-justify">
      {sections.map((section) => (
        <motion.div
          key={section.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <HeadingText
            heading={section.name}
            headingCN="text-3xl md:text-4xl font-bold mb-1 text-blue-700"
          />

          {section.desc && (
            <p className="text-base md:text-lg text-gray-600 mt-4 leading-relaxed mb-4">
              {section.desc}
            </p>
          )}

          <div className="space-y-3 pl-1 mt-4">
            {section.content.map((paragraph, index) => (
              <div key={index} className="flex items-start gap-3 text-gray-700">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 shrink-0" />
                <p className="text-sm md:text-base leading-snug">{paragraph}</p>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default VisionMission;

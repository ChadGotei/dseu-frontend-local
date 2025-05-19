import { CheckCircle } from "lucide-react";
import { aboutTheUniversity } from "../../constants/INTRODUCTION.JS";
import HeadingText from "../Reusable/HeadingText";

const About = () => {
  return (
    <div className="w-4/5 p-1 sm:p-3 md:p-4 mx-auto my-8 rounded-lg text-gray-800">
      <div className="text-left mb-10">
        <HeadingText heading={"About DSEU"} />

        {aboutTheUniversity.info1.map((info, index) => (
          <p key={index} className="my-4 text-gray-600 text-justify">
            {info}
          </p>
        ))}

        <h2 className="text-xl mt-6 mb-3 font-semibold">Objectives</h2>
        <ul className="pl-2 text-gray-600 list-none">
          {aboutTheUniversity.objectives.map((objective, index) => (
            <li
              key={index}
              className="mb-3 flex items-start gap-3 text-justify"
            >
              <CheckCircle className="text-blue-500 w-5 h-5 mt-1 flex-shrink-0" />
              <span>{objective}</span>
            </li>
          ))}
        </ul>

        {aboutTheUniversity.info2.map((info, index) => (
          <p key={index} className="my-4 text-gray-600 text-justify">
            {info}
          </p>
        ))}
      </div>
    </div>
  );
};

export default About;

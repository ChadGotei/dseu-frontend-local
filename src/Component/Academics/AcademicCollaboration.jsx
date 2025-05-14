import { useState } from "react";
import data from "./collaboration.json";
import HeadingText from "../Reusable/HeadingText";

const AcademicCollaboration = () => {
  const [archived, setArchived] = useState(false);

  const handleArchivedButton = (e) => {
    e.preventDefault();
    setArchived((prev) => !prev);
  };

  const sectionTitle = archived
    ? "Archived Collaborations"
    : "Academic Collaborations";

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-gray-800 pt-10 pb-20">
      <HeadingText
        heading={sectionTitle}
        headingCN="text-3xl sm:text-4xl md:text-5xl font-semibold text-center"
      />

      <div className="overflow-x-auto shadow-lg rounded-2xl mt-10">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-6 py-3 text-left text-[12px] font-semibold text-blue-700 uppercase tracking-wider border-b whitespace-nowrap">
                S. No.
              </th>
              <th className="px-6 py-3 text-left text-[12px] font-semibold text-blue-700 uppercase tracking-wider border-b">
                Title
              </th>
              <th className="px-6 py-3 text-left text-[12px] font-semibold text-blue-700 uppercase tracking-wider border-b">
                Date
              </th>
              <th className="px-6 py-3 text-left text-[12px] font-semibold text-blue-700 uppercase tracking-wider border-b">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-[12px] font-semibold text-blue-700 uppercase tracking-wider border-b">
                Target Program
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
            <tr key={item.sno} className="border-b hover:bg-emerald-50 cursor-pointer">
              <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
              <td className="px-6 py-4 text-sm text-gray-800 font-semibold">{item.title}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{item.date}</td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {item.duration || "-"}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {item.domain || "-"}
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AcademicCollaboration;

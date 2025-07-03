import { useState } from "react";
import HeadingText from "../Reusable/HeadingText";
import ArchiveButton from "../Reusable/ArchiveButton";
import { data } from "./TENDERS.JS";

const headers = [
  "S. No.",
  "Tender No.",
  "Title",
  "Department",
  "Category",
  "Start Date",
  "Submission Date",
  "Tender Document",
  "Pre-bid Minutes",
  "Corrigendum/ Addendum",
];

const Tenders = () => {
  const [archived, setArchived] = useState(false);

  const handleArchivedButton = (e) => {
    e.preventDefault();
    setArchived((prev) => !prev);
  };

  const sectionTitle = archived ? "Archived Tenders" : "Tenders";

  // Filter data based on archived state
  const filteredTenders = data.filter((item) => item.archived === archived);

  return (
    <div className="p-6">
      <HeadingText
        heading={sectionTitle}
        headingCN="text-3xl sm:text-4xl md:text-5xl font-semibold text-center"
      />

      <div className="overflow-x-auto shadow-lg rounded-2xl mt-10">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-blue-100">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className={`px-6 py-3 text-left text-[12px] font-semibold text-blue-700 uppercase tracking-wider border-b ${header === 'S. No.' && 'whitespace-nowrap'}`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredTenders.length === 0 ? (
              <tr>
                <td
                  colSpan="10"
                  className="text-center py-10 text-gray-500 text-md"
                >
                  No {archived ? "archived" : "active"} tenders available.
                </td>
              </tr>
            ) : (
              filteredTenders.map((item, index) => (
                <tr key={item.id} className="border-b">
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-sm text-blue-600 whitespace-nowrap">
                    {item.tenderNo || "__"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 min-w-[300px] sm:min-w-[250px] md:min-w-[200px]">
                    {item.title || "__"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {item.department || "__"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {item.category || "__"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                    {item.startDate || "__"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {item.endDate || "__"}
                  </td>
                  <td className="px-6 py-4 text-sm text-blue-600">
                    <a
                      href={item.document}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      View
                    </a>
                  </td>
                  <td className="px-6 py-4 text-sm text-blue-600">
                    {item.preMinutes ? (
                      <a
                        href={item.preMinutes}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        View
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-blue-600">
                    {item.corrigendum ? (
                      <a
                        href={item.corrigendum}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        View
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end myx-6">
        <ArchiveButton
          handleArchivedButton={handleArchivedButton}
          archived={archived}
          archivedText="See Tenders"
          text="See Archived Tenders"
        />
      </div>
    </div>
  );
};

export default Tenders;

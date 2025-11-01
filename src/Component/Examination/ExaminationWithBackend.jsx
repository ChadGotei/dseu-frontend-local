import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Listbox } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";

import HeadingText from "../Reusable/HeadingText";
import ExaminationSidebar from "./ExaminationSidebar";

import { examinationNav } from "./examinationData";
import { QUERY_KEYS } from "../../utils/queryKeys";
import { getExaminationsBySection } from "../../utils/apiservice";

const Examination = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const sectionParam = params.get("section") || "notices";

  const [selected, setSelected] = useState(
    examinationNav.find((item) => item.key === sectionParam) || examinationNav[0]
  );

  // Update when URL changes
  useEffect(() => {
    const current = examinationNav.find((item) => item.key === sectionParam);
    if (current && current.key !== selected.key) {
      setSelected(current);
    }
  }, [sectionParam]);

  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.GET_EXAMINATIONS, selected.key],
    queryFn: () => getExaminationsBySection(selected.key),
    enabled: !!selected.key,
    staleTime: 5 * 60 * 1000,
  });

  const handleChange = (item) => {
    setSelected(item);
    if (item.external) {
      window.open(item.to, "_blank");
    } else {
      navigate(`/examination?section=${item.key}`, { replace: true });
    }
  };

  const renderContent = () => {
    if (isLoading)
      return (
        <p className="text-center text-gray-500 mt-6 animate-pulse">
          Loading {selected.label}...
        </p>
      );

    if (isError)
      return (
        <p className="text-center text-red-600 mt-6">
          Failed to load examination data.
        </p>
      );

    if (!data || data.length === 0)
      return <p className="text-center text-gray-500 mt-6">No documents found.</p>;

    return (
      <div>
        <HeadingText heading={selected.label} headingCN="text-blue-900" />
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 mt-10">
          <div className="flex justify-between bg-blue-900 text-white font-semibold px-6 py-3">
            <div className="flex-1">Title / File</div>
            <div className="w-40 text-right">Uploaded</div>
          </div>
          <div className="divide-y divide-gray-200">
            {data.map((doc, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center px-6 py-3 hover:bg-blue-50 transition"
              >
                <a
                  href={doc.fileLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline flex-1 pr-2 text-xs sm:text-sm md:text-base"
                >
                  {doc.title}
                </a>
                <div className="w-40 text-right text-gray-700 text-xs sm:text-sm md:text-base">
                  {new Date(doc.createdAt).toLocaleDateString("en-IN")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-center bg-[#f8fafc] min-h-screen">
      {/* Mobile Dropdown */}
      <div className="w-full max-w-xs mx-auto mt-4 md:hidden">
        <Listbox value={selected} onChange={handleChange}>
          <div className="relative">
            <Listbox.Button className="w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 font-semibold">
              {selected.label}
            </Listbox.Button>
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
              {examinationNav.map((item) => (
                <Listbox.Option
                  key={item.key}
                  value={item}
                  className={({ active }) =>
                    `cursor-pointer select-none px-4 py-2 ${
                      active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                    }`
                  }
                >
                  {item.label}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>

      {/* Sidebar */}
      <ExaminationSidebar
        items={examinationNav}
        selectedKey={selected.key}
        onSelect={handleChange}
      />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-5xl px-3 sm:px-6 md:px-8 py-6 md:py-12">
        {renderContent()}
      </main>
    </div>
  );
};

export default Examination;

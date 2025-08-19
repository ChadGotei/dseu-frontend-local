import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_API_BASE_URL || "";
const apiBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;

const validSectionsMap = {
  admission: "Admission",
  students: "Students",
  "important links": "Important Links",
  "alerts and circulars": "Notices",
};

const useQueryParam = () => {
  const location = useLocation();
  return useMemo(() => new URLSearchParams(location.search), [location.search]);
};

const ExtendedBulletin = () => {
  const navigate = useNavigate();
  const query = useQueryParam();
  const sectionParam = (query.get("section") || "").toLowerCase();

  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const sectionKey = useMemo(
    () => (validSectionsMap[sectionParam] ? sectionParam : ""),
    [sectionParam]
  );

  useEffect(() => {
    if (!sectionKey) {
      navigate("/informationbulletin?section=admission", { replace: true });
      return;
    }

    if (
      typeof window !== "undefined" &&
      window.location.protocol === "https:" &&
      apiBase.startsWith("http://")
    ) {
      setError("API must use HTTPS when site is served over HTTPS.");
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchNotices = async () => {
      setIsLoading(true);
      setError("");
      try {
        const res = await axios.get(`${apiBase}notice`, {
          params: { section: sectionKey, limit: 50, page: 1 },
          signal: controller.signal,
        });
        setNotices(res.data?.data?.notices || []);
      } catch (err) {
        if (axios.isCancel(err)) return;
        console.error("Failed to load notices:", err);
        setError(
          err?.response?.data?.message || err.message || "Failed to fetch"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotices();
    return () => controller.abort();
  }, [sectionKey, navigate]);

  const sectionTitle = validSectionsMap[sectionKey] || "Information Bulletin";

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">
      {/* Page Heading */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900">
          {sectionTitle}
        </h1>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Stay updated with the latest notices and information for{" "}
          <span className="font-semibold text-blue-700">{sectionTitle}</span>.
        </p>
        <div className="mt-4 mx-auto w-24 h-1 bg-blue-600 rounded-full" />
      </div>

      {/* Content Section */}
      <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8">
        {isLoading ? (
          <div className="text-center text-gray-500 text-lg">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-600 text-lg font-medium">
            {error}
          </div>
        ) : notices.length === 0 ? (
          <div className="text-center text-gray-500 italic text-lg">
            No notices available at the moment.
          </div>
        ) : (
          <div className="max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            <ul className="space-y-4">
              {notices.map((item) => (
                <li
                  key={item._id || item.fileName}
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all duration-200 bg-gray-50"
                >
                  {/* File Name (truncate if too long) */}
                  <span className="truncate pr-4 text-gray-800 font-medium">
                    {item.fileName}
                  </span>

                  {/* View Button */}
                  <a
                    href={item.fileLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full font-medium transition"
                  >
                    View PDF
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExtendedBulletin;

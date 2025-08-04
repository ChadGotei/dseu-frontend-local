import { ExternalLink } from "lucide-react";
import { useNoticesBySection } from "../../hooks/useNoticesBySection";
import { useEffect, useState } from "react";

const toAdd = [
  {
    fileLink: "https://dseu.ac.in/admission/result/pg",
    fileName: "Postgraduate results are now live!"
  },
  {
    fileName: "Refund form 2025 admissions",
    fileLink: "https://drive.google.com/file/d/1ogrH8FlZ3FG36b44UVghbET0pLw-dHWE/view",
  },
  {
    fileName: "Diploma Cancelled seat data",
    fileLink: "https://drive.google.com/file/d/1ZMnYb-piIHJUkYRtmRMH0woE3UztIPAC/view",
  },
  {
    fileLink: "https://dseu.ac.in/admission/result/ug",
    fileName: "Undergraduate results are now live!"
  },
  {
    fileLink: "https://drive.google.com/file/d/1jyw7k5SHVq49ZUJGA7I9B05Hw1KnVGiN/view",
    fileName: "Syllabus and Exam Pattern for Deputy Registrar & Assistant Registrar"
  }
]

const AnnouncementStrip = () => {
  const [announcements, setAnnouncements] = useState([]);
  const { data, isLoading } = useNoticesBySection(
    "announcements",
    false,
    100,
    1
  );

  useEffect(() => {
    if (data) {
      if (data.data && Array.isArray(data.data.notices)) {
        const updated = [
          ...toAdd,
          ...data.data.notices,
        ];
        setAnnouncements(updated);
      } else {
        setAnnouncements([{ fileName: toAdd, fileLink: "" }]);
      }
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-12 bg-white border-y border-gray-200 w-full">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
        </div>
      </div>
    );
  }

  if (!announcements || announcements.length === 0) {
    return (
      <div className="flex items-center justify-center h-12 bg-white border-y border-gray-200 w-full text-sm sm:text-base text-gray-500 italic text-center">
        No announcements at the moment. Please check back soon or Check your internet!
      </div>
    );

  }

  return (
    <div className="flex bg-white border-y border-gray-200 mt-4">
      <div className="bg-blue-600 text-white flex w-28 lg:w-auto items-center px-5">
        <span className="text-[12px] ml-[-10px] sm:text-[10px] lg:text-[14px] font-bold">
          Announcements
        </span>
      </div>
      <div className="h-10 flex items-center overflow-hidden relative w-full text-xs sm:text-sm md:text-base">
        <div className="animate-marquee inline-flex items-center absolute whitespace-nowrap">
          {announcements.map((announcement, index) =>
            announcement.fileLink ? (
              <a
                key={index}
                href={announcement.fileLink}
                className="flex items-center hover:text-blue-800 transition-colors mx-4 text-blue-600"
                target={announcement.samePage ? "_self" : "_blank"}
                rel={announcement.samePage ? undefined : "noopener noreferrer"}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                <span>{announcement.fileName}</span>
                <span className="new-badge ml-2">New</span>
                {index !== announcements.length - 1 && (
                  <span className="mx-4 text-gray-400">|</span>
                )}
              </a>
            ) : (
              <div key={index} className="flex items-center text-blue-600 mx-4">
                <span>{announcement.fileName}</span>
                <span className="new-badge ml-2">New</span>
                {index !== announcements.length - 1 && (
                  <span className="mx-4 text-gray-400">|</span>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

const style = `
  @keyframes marquee {
    0% {
      transform: translateX(30%);
    }
    100% {
      transform: translateX(-100%);
    }
  }

  @media (max-width: 640px) {
    @keyframes marquee {
      0% {
        transform: translateX(15%);
      }
      100% {
        transform: translateX(-100%);
      }
    }
  }

  .animate-marquee {
    animation: marquee 45s linear infinite;
  }

  .animate-marquee:hover {
    animation-play-state: paused;
  }

  @keyframes newBadgeColorChange {
    0% { color: #ff6347; }
    25% { color: #ffa500; }
    50% { color: #32cd32; }
    75% { color: #1e90ff; }
    100% { color: #ff6347; }
  }

  .new-badge {
    font-size: 12px;
    font-weight: bold;
    animation: newBadgeColorChange 2s infinite;
  }
`;

export default () => (
  <>
    <style>{style}</style>
    <AnnouncementStrip />
  </>
);

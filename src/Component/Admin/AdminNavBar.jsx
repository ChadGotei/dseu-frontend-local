import { FileText, Megaphone, Users, Briefcase, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const navTabs = [
  {
    key: "information-bulletin",
    label: "Information Bulletin",
    icon: FileText,
  },
  {
    key: "announcements",
    label: "Announcement",
    icon: Megaphone,
  },
  {
    key: "statutory-body",
    label: "Statutory Body",
    icon: Users,
  },
  {
    key: "work-with-us",
    label: "Work With Us",
    icon: Briefcase,
  },
  {
    key: "administration",
    label: "Administration",
    icon: Shield,
  },
];

export const DesktopNav = ({ activeTab, handleTabChange }) => {
  const navigate = useNavigate();

  return (
    <aside className="w-72 bg-white shadow-lg rounded-2xl p-6 space-y-4 hidden md:block">
      <h2 className="text-2xl font-bold text-gray-700">Upload Categories</h2>

      <div className="flex flex-col gap-14 md:gap-16">
        <ul className="space-y-2">
          {navTabs.map(({ key, label, icon: Icon }) => (
            <li key={key}>
              <button
                onClick={() => handleTabChange(key)}
                className={`w-full text-left px-4 py-2 rounded-full flex items-center gap-2 transition whitespace-nowrap ${
                  activeTab === key
                    ? "bg-blue-400 text-white"
                    : "text-gray-700 hover:bg-blue-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => navigate("/admin/archive-uploads")}
          className="w-full py-2 mt-3 rounded-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold transition-colors duration-300"
        >
          Manual Archive
        </button>
      </div>
    </aside>
  );
};

export const MobileNav = ({ activeTab, handleTabChange }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="md:hidden w-full bg-white shadow-md rounded-xl px-4 py-3 flex items-center justify-between overflow-x-auto gap-2">
        {navTabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => handleTabChange(key)}
            className={`flex flex-col items-center text-sm px-2 py-1 rounded-md whitespace-nowrap ${
              activeTab === key
                ? "text-blue-500 font-semibold"
                : "text-gray-600 hover:text-blue-400"
            }`}
          >
            <Icon className="w-5 h-5 mb-1" />
            {label}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => navigate("/admin/archive-uploads")}
        className="w-full py-2 mt-3 rounded-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold transition-colors duration-300"
      >
        Manual Archive
      </button>
    </div>
  );
};

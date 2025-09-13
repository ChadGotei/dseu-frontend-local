import { Plus, FileSearch, PersonStanding, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import withAuthProtection from "./withAuthProtection";
import HeadingText from "../Reusable/HeadingText";

import { showSuccessToast } from "../../utils/toasts";

const dashboardItems = [
  {
    id: "upload-pdfs",
    label: "Upload PDFs",
    path: "/admin/uploads",
    icon: Plus,
  },
  {
    id: "view-pdfs",
    label: "View all PDFs",
    path: "/admin/view-pdfs",
    icon: FileSearch,
  },
  {
    id: "result",
    label: "Add Student",
    path: "/admin/result/add-student",
    icon: PersonStanding,
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    showSuccessToast("User logged our successfuly!")
    navigate("/admin-login");
  };

  return (
    <div className="flex flex-col min-h-[92vh] md:min-h-[70vh] items-center justify-center px-4 bg-gray-50 relative">
      <button
        onClick={handleLogout}
        className="
          absolute top-4 right-4 flex items-center gap-2
          px-4 py-2 rounded-lg bg-red-500 text-white
          font-semibold shadow-md hover:bg-red-600
          focus:outline-none focus:ring-2 focus:ring-red-400
          transition
        "
      >
        <LogOut className="w-5 h-5" />
        Logout
      </button>

      <HeadingText
        heading="Dashboard"
        headingCN="text-4xl md:text-5xl font-bold mb-2 text-center"
      />

      <div
        className="
          grid w-full max-w-5xl mt-8 gap-5
          grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
        "
      >
        {dashboardItems.map(({ id, label, path, icon: Icon }) => (
          <button
            key={id}
            type="button"
            aria-label={label}
            onClick={() => navigate(path)}
            className="
              group relative flex flex-col items-center justify-center
              rounded-2xl border border-gray-200 bg-white p-6 sm:p-8
              shadow-md transition
              hover:shadow-xl hover:border-blue-500 hover:bg-blue-50
              focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
              active:scale-[0.99]
            "
          >
            <span
              className="
                inline-flex items-center justify-center
                h-24 w-24 md:h-[140px] md:w-[140px]
                rounded-xl border border-dashed border-gray-200
                transition
                group-hover:border-blue-300
              "
            >
              <Icon className="h-12 w-12 md:h-16 md:w-16 text-gray-400 transition-colors group-hover:text-blue-500" />
            </span>

            <span className="mt-4 text-base md:text-lg font-semibold text-gray-700 transition-colors group-hover:text-blue-600">
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default withAuthProtection(Dashboard);

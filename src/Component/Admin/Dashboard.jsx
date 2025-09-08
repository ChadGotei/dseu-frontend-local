import { Plus, FileSearch } from "lucide-react";
import withAuthProtection from "./withAuthProtection";
import { useNavigate } from "react-router-dom";
import HeadingText from "../Reusable/HeadingText";

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
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-[92vh] md:min-h-[70vh] items-center justify-center px-4 bg-gray-50">
      <HeadingText
        heading="Dashboard"
        headingCN="text-5xl md:text-5xl font-bold mb-1 text-center"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl mt-10">
        {dashboardItems.map(({ id, label, path, icon: Icon }) => (
          <button
            key={id}
            className="group flex flex-col items-center justify-center border border-gray-200 rounded-2xl p-8 bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:border-blue-500 hover:bg-blue-50"
            onClick={() => navigate(path)}
          >
            <Icon className="h-24 w-24 md:h-[150px] md:w-[150px] text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
            <span className="text-lg md:text-xl text-gray-700 group-hover:text-blue-600 font-semibold mt-4 transition-colors duration-300">
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default withAuthProtection(Dashboard);

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { User, FileText, LogOut, ChevronLeft } from "lucide-react";

import { getFacultyById } from "../../utils/apiservice";
import { addResearch } from "../../utils/facultyApi";
import { showSuccessToast } from "../../utils/toasts";

import TabBtn from "../Reusable/TabBtn";
import FacultyInfoLoading from "../ShimmerUI/FacultyInfoLoading";
import EditOverviewModal from "./Modals/EditOverviewModal";
import AddResearchModal from "./Modals/AddResearchModal";
import ResearchTab from "./Tabs/ResearchTab";
import PublicationsTab from "./Tabs/PublicationsTab";

const FacultyById = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const loggedEmail = sessionStorage.getItem("email");
  const { id } = useParams();

  const {
    data: faculty,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getFacultyById", id],
    queryFn: () => getFacultyById(id),
    enabled: !!id,
  });

  const [activeTab, setActiveTab] = useState("overview");
  const [showOverviewModal, setShowOverviewModal] = useState(false);
  const [showResearchModal, setShowResearchModal] = useState(false);
  const [localOverview, setLocalOverview] = useState("");

  const addMutation = useMutation({
    mutationFn: (data) => addResearch(faculty._id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["getFacultyById", faculty._id]);
      setShowResearchModal(false);
    },
  });

  const handleUpdatedOverview = (newOverview) => {
    setLocalOverview(newOverview);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
    showSuccessToast("Logged out successfully!");
  };

  if (isLoading) return <FacultyInfoLoading />;
  if (!faculty)
    return (
      <div className="text-center text-[#333] text-xl font-semibold min-h-[25vh] flex justify-center items-center">
        Oops! Faculty details not found.
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <p className="text-gray-700">
            {localOverview || faculty.overview || "Bio not available"}
          </p>
        );
      case "research":
        return (
          <ResearchTab researchList={faculty.research} faculty={faculty} />
        );
      case "publications":
        return <PublicationsTab researchList={faculty.research} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-3 md:p-4 lg:p-6 md:mx-20 mt-10 mb-16">
      <button
        onClick={() => navigate(-1)}
        className="ml-3 mb-4 px-4 py-2 bg-blue-500 text-gray-100 rounded transition-colors text-sm flex flex-row items-center justify-center hover:text-blue-500 hover:bg-gray-100 hover:shadow-sm hover:shadow-blue-400
        hover:scale-[1.01]"
      >
        <ChevronLeft />
        Back
      </button>

      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex flex-col items-center md:items-start gap-4 md:min-w-[300px] sm:min-w-[250px]">
          <h2 className="text-2xl font-bold block md:hidden">
            {`${faculty.salutation ?? ""} ${faculty.firstname} ${
              faculty.surname ?? ""
            }`}
          </h2>
          <img
            className="max-h-[250px] max-w-fit md:max-h-[350px] md:max-w-[18rem] object-cover rounded-lg"
            src={faculty.photo}
            alt="Faculty"
          />
          <div className="text-xl font-semibold text-center md:text-left">
            Designation:{" "}
            <span className="font-light">{faculty.designation}</span>
          </div>
          <div className="text-center md:text-left">
            <a
              href={`mailto:${faculty.email}`}
              className="text-blue-500 hover:underline"
            >
              {faculty.email}
            </a>
          </div>

          {loggedEmail === faculty.email && (
            <div className="flex flex-col gap-2 mt-3 w-full items-center md:items-start">
              <div className="flex gap-2">
                <button
                  onClick={() => setShowOverviewModal(true)}
                  className="px-5 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
                >
                  Edit Overview
                </button>
                <button
                  onClick={() => setShowResearchModal(true)}
                  className="px-5 py-3 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors text-sm"
                >
                  Add Research
                </button>
              </div>
              <button
                onClick={handleLogout}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-2 text-sm"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>

        <div className="w-full">
          <div className="flex justify-between items-center mb-9 flex-col lg:flex-row gap-3 sm:gap-4">
            <h2 className="text-2xl font-bold hidden md:block">
              {`${faculty.salutation ?? ""} ${faculty.firstname} ${
                faculty.surname ?? ""
              }`}
            </h2>
            <div className="flex flex-wrap gap-2 mt-2 items-center">
              <TabBtn
                label="Overview"
                tab="overview"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                icon={<User size={16} />}
              />
              <TabBtn
                label="Research"
                tab="research"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                icon={<FileText size={16} />}
              />
              <TabBtn
                label="Publications"
                tab="publications"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                icon={<FileText size={16} />}
              />
            </div>
          </div>
          {renderTabContent()}
        </div>
      </div>

      {showOverviewModal && (
        <EditOverviewModal
          facultyId={id}
          initialOverview={faculty.overview}
          onClose={() => setShowOverviewModal(false)}
          onUpdated={handleUpdatedOverview}
        />
      )}

      {showResearchModal && (
        <AddResearchModal
          type={"Add"}
          facultyId={id}
          onClose={() => setShowResearchModal(false)}
          mutation={addMutation}
        />
      )}
    </div>
  );
};

export default FacultyById;

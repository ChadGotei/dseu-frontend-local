import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import withAuthProtection from "./withAuthProtection";
import { uploadPdf } from "../../utils/apiservice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { DesktopNav, MobileNav, navTabs as tabs } from "./AdminNavBar";
import { SESSION_EXPIRE } from "../../constants/LOCALES.JS";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("information-bulletin");
  const [name, setName] = useState("");
  const [section, setSection] = useState("");
  const [file, setFile] = useState(null);
  const [autoArchive, setAutoArchive] = useState(false);
  const [validUntil, setValidUntil] = useState("2025-04-16T09:30:00.000Z");
  const [endDate, setEndDate] = useState("");
  const [apply, setApply] = useState("");
  const [vacancy, setVacancy] = useState("");
  const [applyError, setApplyError] = useState("");

  const fileInputRef = useRef(null);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    if (file && file.size > 50 * 1024 * 1024) {
      toast.error("File size cannot exceed 50 MB.");
      fileInputRef.current.value = "";
      setFile(null);
    }
  }, [file]);

  const urlPattern =
    /^(https?:\/\/)?([a-z0-9]+[.])+(com|org|net|gov|edu|io)(\/[a-z0-9#]+\/?)*$/i;

  const getSectionOptions = () => {
    switch (activeTab) {
      case "information-bulletin":
        return [
          { value: "admission", label: "Admission" },
          { value: "students", label: "Students" },
          { value: "important links", label: "Important Links" },
          { value: "alerts and circulars", label: "Notices" },
        ];
      case "announcements":
        return [{ value: "announcements", label: "Announcement" }];
      case "statutory-body":
        return [
          {
            value: "member university court",
            label: "University Court Members",
          },
          {
            value: "member board of management",
            label: "Board of Management Members",
          },
          {
            value: "member academic council",
            label: "Academic Council Members",
          },
          {
            value: "member finance comittee",
            label: "Finance Committee Members",
          },
          { value: "university court", label: "MOM University Court" },
          { value: "board of management", label: "MOM Board of Management" },
          { value: "academic council", label: "MOM Academic Council" },
          { value: "finance comittee", label: "MOM Finance Committee" },
        ];
      case "work-with-us":
        return [
          { value: "academic positions", label: "Academic Positions" },
          { value: "non academic positions", label: "Non Academic Positions" },
          { value: "short term positions", label: "Short Term Positions" },
          { value: "results", label: "Results" },
          { value: "recruitments and notice", label: "Notice" },
        ];
      case "administration":
        return [
          { value: "recruitment rules", label: "Recruitment Rules" },
          { value: "ad office orders", label: "Office Orders" },
          { value: "ad circulars", label: "Circulars" },
          { value: "ad important forms", label: "Important Forms" },
        ];
      default:
        return [];
    }
  };

  const handleTabChange = (tab = false) => {
    if (tab) {
      setActiveTab(tab);
    }
    setSection("");
    setName("");
    setFile(null);
    setAutoArchive(false);
    setValidUntil("");
    setEndDate("");
    setApply("");
    setVacancy("");
  };

  const mutation = useMutation({
    mutationFn: (formData) => uploadPdf(formData),
    onSuccess: (response) => {
      const data = response?.data || response;
      queryClient.invalidateQueries({ queryKey: ["notices", data.section] });
      queryClient.invalidateQueries({ queryKey: ["notices", section] });
      fileInputRef.current.value = ""; // clearing file name
      setName("");
      setSection("");
      setFile(null);
      setAutoArchive(false);
      setValidUntil("");
      setEndDate("");
      setApply("");
      setVacancy("");
      toast.success(`Uploaded File`);
    },
    onError: (error) => {
      if (error?.response?.data?.error) {
        toast.error(error?.response?.data?.error);
      } else {
        toast.error(SESSION_EXPIRE || error?.message);
        sessionStorage.clear();
        navigate("/admin-login");
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTabLabel === "Work With Us" && apply && !urlPattern.test(apply)) {
      toast.error("Please enter a valid URL in Apply field!");
      return;
    }
    if (!name || !section || !file) {
      toast.error("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("fileName", name);
    formData.append("section", section);
    formData.append("pdf", file);
    formData.append("category", "activeTab");

    if (autoArchive && validUntil) {
      formData.append("validUntil", new Date(validUntil).toISOString());
      formData.append("autoArchive", "true");
    }

    if (endDate) {
      formData.append("endDate", new Date(endDate).toISOString());
    }

    if (apply) {
      formData.append("apply", apply);
    }

    if (vacancy) {
      formData.append("vacancies", vacancy);
    }

    mutation.mutate(formData);
  };

  const activeTabLabel = tabs.find((tab) => tab.key === activeTab)?.label || "";

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-10 flex gap-6 flex-col md:flex-row">
      <DesktopNav activeTab={activeTab} handleTabChange={handleTabChange} />
      <MobileNav activeTab={activeTab} handleTabChange={handleTabChange} />

      <main className="flex-1 bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Upload PDF : {activeTabLabel.toUpperCase()}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-9">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Enter the file name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-100  px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Section <span className="text-red-500">*</span>
            </label>
            <select
              className="py-3 px-4 pe-9 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              required
            >
              <option value="">Select Section</option>
              {getSectionOptions().map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              PDF File <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept=".pdf"
              ref={fileInputRef}
              onChange={(e) => {
                const selectedFile = e.target.files[0];
                if (selectedFile && selectedFile.type === "application/pdf") {
                  setFile(selectedFile);
                } else {
                  toast.error("Please upload PDFs only");
                  e.target.value = "";
                }
              }}
              className="w-full text-slate-500 font-medium text-base bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:mr-4 file:bg-blue-400 file:hover:bg-orange-400 file:text-white rounded"
              required
            />
          </div>

          {activeTabLabel === "Work With Us" && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Enter the apply (only links)
                </label>
                <input
                  type="text"
                  value={apply}
                  onChange={(e) => {
                    const val = e.target.value;
                    setApply(val);
                    if (val && !urlPattern.test(val)) {
                      setApplyError("Invalid URL format");
                    } else {
                      setApplyError("");
                    }
                  }}
                  className="w-full bg-gray-100 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {applyError && (
                  <p className="text-red-500 text-sm mt-1">{applyError}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Enter Number of Vacancies
                </label>
                <input
                  type="number"
                  value={vacancy}
                  onChange={(e) => setVacancy(e.target.value)}
                  className="w-full bg-gray-100 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}

          <div className={`${activeTabLabel === "Administration" && "hidden"}`}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full bg-gray-100  px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="autoArchive"
              checked={autoArchive}
              onChange={(e) => setAutoArchive(e.target.checked)}
              className="h-5 w-5 text-blue-600 border-gray-300 rounded-sm focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor="autoArchive" className="text-sm text-gray-700">
              Auto Archive
            </label>
          </div>

          {autoArchive && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Archive Date
              </label>
              <input
                type="date"
                value={validUntil}
                onChange={(e) => setValidUntil(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          )}

          <button
            type="submit"
            disabled={mutation.status === "pending"}
            className="w-full py-3 bg-blue-400 text-white font-semibold rounded-lg hover:bg-orange-400 transition disabled:cursor-not-allowed"
          >
            {mutation.isPending ? "Uploading..." : "Upload PDF"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default withAuthProtection(AdminDashboard);

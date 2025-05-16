import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { campusOptions } from "./CampusOption";
import { departmentOptions } from "./DepartmentOption";
import { toast } from "react-hot-toast";
import { baseUrl } from "../../constants/LOCALES.JS";

const StudentForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    enrollmentNumber: "",
    department: "",
    program: "",
    campus: "",
    grievanceCategory: "",
    grievanceDescription: "",
    pdf: null,
  });
  const [uploadDocument, setUploadDocument] = useState("");

  const mutation = useMutation({
    mutationFn: async (formPayload) => {
      const res = await fetch(`${baseUrl}studentGrievance`, {
        method: "POST",
        body: formPayload,
      });
      if (!res.ok) throw new Error();
      return res.json();
    },
    onSuccess: () => {
      toast.success("Form submitted successfully!");
      setFormData({
        fullName: "",
        email: "",
        mobile: "",
        enrollmentNumber: "",
        department: "",
        program: "",
        campus: "",
        grievanceCategory: "",
        grievanceDescription: "",
        pdf: null,
      });
      setUploadDocument("");
    },
    onError: () => {
      toast.error("Error. Please try again.");
    },
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (uploadDocument === "yes") {
      setFormData((prev) => ({ ...prev, pdf: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value, pdf: null }));
    }
  };

  const handleSubmit = (e) => {
    console.log("hello");
    e.preventDefault();
    if (!/^\d{10}$/.test(formData.mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    const formPayload = new FormData();
    formPayload.append("fullName", formData.fullName);
    formPayload.append("email", formData.email);
    formPayload.append("enrollmentNumber", formData.enrollmentNumber);
    formPayload.append("mobile", formData.mobile);
    formPayload.append("grievanceCategory", formData.grievanceCategory);
    formPayload.append("department", formData.department);
    formPayload.append("description", formData.grievanceDescription);
    if (uploadDocument === "yes") formPayload.append("pdf", formData.pdf);
    formPayload.append("program", formData.program);
    formPayload.append("campus", formData.campus);

    mutation.mutate(formPayload);
  };

  const setData = (e) => {
    {
      setFormData({
        fullName: "",
        email: "",
        mobile: "",
        enrollmentNumber: "",
        department: "",
        program: "",
        campus: "",
        grievanceCategory: "",
        grievanceDescription: "",
        pdf: null,
      });
      setUploadDocument("");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-blue-600 text-white text-center p-4 text-2xl font-bold mb-8 rounded-lg shadow-md">
        Student Grievance Form
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        {/* Personal Details Section */}
        <div className="bg-blue-100 p-4 mb-6 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-800">
            Personal Details
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter Full Name"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your Email-ID"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Mobile
            </label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter your 10 digit number"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Enrollment Number
            </label>
            <input
              type="text"
              name="enrollmentNumber"
              value={formData.enrollmentNumber}
              onChange={handleChange}
              placeholder="Enter your Enrollment Number"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option selected disabled value="">
                --select--
              </option>
              {departmentOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Program
            </label>
            <input
              type="text"
              name="program"
              value={formData.program}
              onChange={handleChange}
              placeholder="Enter program"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Campus
            </label>
            <select
              name="campus"
              value={formData.campus}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">--select--</option>
              {campusOptions.map((group) => (
                <optgroup key={group.label} label={group.label}>
                  {group.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-blue-100 p-4 mb-6 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-800">
            Grievance Details
          </h2>
        </div>

        <div className="space-y-6 mb-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Grievance Category
            </label>
            <select
              name="grievanceCategory"
              value={formData.grievanceCategory}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option selected disabled value="">
                --select--
              </option>
              <option value="academic">Academic Issues</option>
              <option value="exam">Exam Issues</option>
              <option value="admin">Administrative Issues</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Grievance Description
            </label>
            <textarea
              name="grievanceDescription"
              value={formData.grievanceDescription}
              onChange={handleChange}
              placeholder="Write in brief of your grievance."
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
              maxLength="150"
              required
            ></textarea>
            <p className="text-xs text-gray-500">Maximum 150 characters</p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Want to Upload Document?
            </label>
            <select
              name="uploadDocument"
              value={uploadDocument}
              onChange={(e) => {
                setUploadDocument(e.target.value);
              }}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              defaultValue={uploadDocument}
              required
            >
              <option selected disabled value="">
                --select--
              </option>
              <option value={"yes"}>Yes</option>
              <option value={"no"}>No</option>
            </select>
          </div>

          {uploadDocument === "yes" && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Upload File
              </label>
              <input
                type="file"
                name="pdf"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          )}
        </div>

        <div className="flex justify-center space-x-4 mt-8">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-md shadow-sm transition duration-200 ease-in-out transform hover:scale-105"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Submitting..." : "Submit"}
          </button>
          <button
            type="button"
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-md shadow-sm transition duration-200 ease-in-out transform hover:scale-105"
            onClick={setData}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;

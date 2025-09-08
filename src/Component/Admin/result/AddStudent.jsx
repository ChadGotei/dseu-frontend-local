import withAuthProtection from "../withAuthProtection";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../utils/queryKeys";
import { getProgramAndCourseDetails } from "../../../utils/resultservices";
import { useState, useEffect } from "react";

// constant list of degrees
const DEGREE_OPTIONS = [
  { value: "diploma-1", label: "Diploma Round 1" },
  { value: "diploma-2", label: "Diploma Round 2" },
  { value: "diploma-3", label: "Diploma Round 3" },
  { value: "diploma-4", label: "Diploma Round 4" },
  { value: "ug-1", label: "UG Round 1" },
  { value: "ug-2", label: "UG Round 2" },
  { value: "pg-1", label: "PG Result" },
  { value: "btech-1", label: "B.Tech Round 1" },
  { value: "btech-2", label: "B.Tech Round 2" },
];

// registered categories
const REGISTERED_CATEGORIES = ["GENERAL", "SC", "ST", "OBC"];

// allocated categories
const ALLOCATED_CATEGORIES = [
  { value: "DEL_UR", label: "Delhi General" },
  { value: "DEL_SC", label: "Delhi SC" },
  { value: "DEL_ST", label: "Delhi ST" },
  { value: "DEL_OBC", label: "Delhi OBC" },
  { value: "OD_DEL_UR", label: "Outside Delhi General" },
  { value: "OD_DEL_SC", label: "Outside Delhi SC" },
  { value: "OD_DEL_ST", label: "Outside Delhi ST" },
  { value: "OD_DEL_EWS", label: "Outside Delhi EWS" },
  { value: "EWS", label: "EWS" },
];

// regions
const REGIONS = ["Delhi", "Outside Delhi"];

const AddStudent = () => {
  const [degree, setDegree] = useState("diploma-1");
  const [formData, setFormData] = useState({
    form_number: "",
    program: "",
    program_preference: "",
    name: "",
    rank: "",
    campus: "",
    registered_category: "",
    category_allocated: "",
    xth_marks: "",
    region: "",
    gender: "",
    email1: "",
    DOB: "",
    campus_preference: "",
    status: "freeze",
  });

  const { data: optionsData, isLoading: isOptionsLoading } = useQuery({
    queryKey: [QUERY_KEYS.GET_PROGRAM_AND_CAMPUS_DETAILS_BY_DEGREE, degree],
    queryFn: () => getProgramAndCourseDetails(degree),
    gcTime: 60 * 60 * 1000,
    staleTime: Infinity,
    retry: 2,
  });

  useEffect(() => {
    if (optionsData) {
      console.log("Fetched optionsData for", degree, optionsData);
    }
  }, [optionsData, degree]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting student:", formData);
    // TODO: integrate with backend addStudent API
  };

  return (
    <div className="p-6 flex flex-col items-center w-full">
      <h1 className="text-2xl font-bold mb-6">Add Student</h1>

      {/* Degree selection */}
      <div className="mb-6 w-full max-w-2xl">
        <label className="block mb-2 font-medium">Select Degree:</label>
        <select
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
        >
          {DEGREE_OPTIONS.map((deg) => (
            <option key={deg.value} value={deg.value}>
              {deg.label}
            </option>
          ))}
        </select>
      </div>

      {/* Student form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl"
      >
        {/* left column */}
        <div>
          <label className="block mb-1">Form Number</label>
          <input
            type="text"
            name="form_number"
            value={formData.form_number}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />

          <label className="block mt-4 mb-1">Program</label>
          <select
            name="program"
            value={formData.program}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Select Program --</option>
            {optionsData?.data?.programs?.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <label className="block mt-4 mb-1">Program Preference</label>
          <input
            type="number"
            name="program_preference"
            value={formData.program_preference}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />

          <label className="block mt-4 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />

          <label className="block mt-4 mb-1">Rank</label>
          <input
            type="number"
            name="rank"
            value={formData.rank}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* right column */}
        <div>
          <label className="block mb-1">Campus</label>
          <select
            name="campus"
            value={formData.campus}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Select Campus --</option>
            {optionsData?.data?.campuses?.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <label className="block mt-4 mb-1">Registered Category</label>
          <select
            name="registered_category"
            value={formData.registered_category}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Select Registered Category --</option>
            {REGISTERED_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <label className="block mt-4 mb-1">Category Allocated</label>
          <select
            name="category_allocated"
            value={formData.category_allocated}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Select Allocated Category --</option>
            {ALLOCATED_CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>

          <label className="block mt-4 mb-1">10th Marks</label>
          <input
            type="number"
            name="xth_marks"
            value={formData.xth_marks}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />

          <label className="block mt-4 mb-1">Region</label>
          <select
            name="region"
            value={formData.region}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Select Region --</option>
            {REGIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* full width fields */}
        <div className="md:col-span-2">
          <label className="block mb-1">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Select Gender --</option>
            <option value="FEMALE">Female</option>
            <option value="MALE">Male</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email1"
            value={formData.email1}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1">Date of Birth</label>
          <input
            type="input"
            name="DOB"
            minLength={10}
            maxLength={10}
            value={formData.DOB}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1">Campus Preference</label>
          <input
            type="number"
            name="campus_preference"
            value={formData.campus_preference}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="freeze">Freeze</option>
            <option value="float">Float</option>
          </select>
        </div>

        {/* Submit button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Save Student
          </button>
        </div>
      </form>
    </div>
  );
};

export default withAuthProtection(AddStudent);

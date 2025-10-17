import axios from "axios";
import { getFaculties } from "./apiservice";
import { baseUrl } from '../constants/LOCALES.JS';

export const getFacutlyByEmail = async (email) => {
  const allFaculties = await getFaculties();

  if (!Array.isArray(allFaculties)) {
    console.error("getFaculties() did not return an array:", allFaculties);
    return null;
  }

  const res = allFaculties.find(
    (faculty) =>
      faculty.email?.toLowerCase().trim() === email?.toLowerCase().trim()
  );

  if (!res) {
    console.warn(`Faculty not found for email: ${email}`);
  }

  return res || null;
};


export const updateFacultyOverview = async (overviewText, facultyId) => {
  const token = sessionStorage.getItem("token");

  try {
    const response = await axios.put(
      `${baseUrl}faculty/${facultyId}`,
      { overview: overviewText },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error.response);
    throw error;
  }
};


export const addResearch = async (facultyId, researchData) => {
  const token = sessionStorage.getItem("token");

  try {
    const response = await axios.post(
      `${baseUrl}faculty/${facultyId}/research`,
      researchData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding research:", error.response || error.message);
    throw error;
  }
};


export const deleteResearch = async (facultyId, researchId) => {
  const token = sessionStorage.getItem("token");
  try {
    const response = await axios.delete(
      `${baseUrl}faculty/${facultyId}/research/${researchId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting research:", error.response || error.message);
    throw error;
  }
};


export const updateResearch = async (facultyId, researchId, researchData) => {
  const token = sessionStorage.getItem("token");

  try {
    const response = await axios.patch(
      `${baseUrl}faculty/${facultyId}/research/${researchId}`,
      researchData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating research:", error.response || error.message);
    throw error;
  }
};

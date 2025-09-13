import axios from "axios";
import api from "./api";
import { baseUrl } from '../constants/LOCALES.JS';

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getDepartments = async () => {
  try {
    const response = await api.get("/departments", {
      headers: getAuthHeaders(),
    });
    return response.data.data.departments;
  } catch (error) {
    console.error("Error fetching departments:", error.response?.data || error.message);
    throw error;
  }
};

export const getFaculties = async () => {
  try {
    const response = await api.get("/faculty?limit=1000", {
      headers: getAuthHeaders(),
    });
    return response.data.data.faculty;
  } catch (error) {
    console.error("Error fetching faculties:", error.response?.data || error.message);
    throw error;
  }
};

export const getFacultyByDepartment = async (id) => {
  try {
    const faculties = await getFaculties();
    const filteredFaculties = faculties.filter((faculty) => faculty.dept_id && faculty.dept_id._id === id);

    return filteredFaculties.sort((a, b) => (
      a.firstname.localeCompare(b.firstname)
    ));
  } catch (error) {
    console.error("Error filtering faculty by department:", error.response?.data || error.message);
    throw error;
  }
};

export const getFacultyById = async (id) => {
  const allFaculties = await getFaculties();
  return allFaculties.find((faculty) => faculty._id === String(id));
};

export const getDepartmentById = async (id) => {
  try {
    const response = await api.get("/departments", {
      headers: getAuthHeaders(),
    });
    const departments = response.data.data.departments;
    return departments.find((d) => d._id === id);
  } catch (error) {
    console.error("Error fetching department name:", error.response?.data || error.message);
    throw error;
  }
};


// get department by school
export const getDepartmentsBySchool = async (id) => {
  const response = await api.get(`/departmentSchools`);
  const data = response.data.data.departmentSchools.find(
    (school) => school._id === id
  );

  return { departments: data.dept_id, name: data.name, schoolName: data.name };
};

export const getSchools = async () => {
  const response = await api.get('/departmentSchools');
  if (response.status !== 200) {
    throw new Error('Network response was not ok');
  }
  const schools = response.data?.data?.departmentSchools;
  if (!Array.isArray(schools)) {
    throw new Error('Unexpected data format');
  }
  return schools.sort((a, b) => a.name.localeCompare(b.name));
};

// get hod info
export const getHodInfo = async (deptId) => {
  const departmentOfHod = await getDepartmentById(deptId);
  if (!departmentOfHod?.hod) return false; // HOD doesn't exist

  const allFaculties = await getFaculties();
  return allFaculties.find((faculty) => faculty.email === departmentOfHod.hod) || false;
};


// programs related to the departments
export const getProgramByDepartment = async (id, system) => {
  const response = await api.get(`/program/${id}`);
  const programs = response.data.data.programs;

  if (!programs) return [];

  return programs.filter(program => program.programLevel === system);
};

// get all programs
export const getAllPrograms = async () => {
  const response = await api.get('/program');
  return response.data.data.programs;
};

// get information of a single program
export const getProgramData = async (id) => {
  const allPrograms = await getAllPrograms();
  const program = allPrograms.find((program) => program._id === id) ?? "data not found";

  return program;
};

// programs by level such as pg ug diploma
export const getProgramsByLevel = async (level) => {
  const allPrograms = await getAllPrograms();
  const filteredPrograms = allPrograms.filter(
    (program) => program.programLevel?.toLowerCase() === level.toLowerCase()
  );

  return filteredPrograms.sort((a, b) => a.name.localeCompare(b.name));
};


// get campus data
export const getAllCampus = async () => {
  const response = await api.get('/campus');
  return response.data.data.campuses;
}


// get campus by name
export const getCampusByName = async (name) => {
  const allCampuses = await getAllCampus();
  const data = allCampuses.find((campus) => campus.name.toLowerCase() === name);

  return data || null;
}

// pdf through category such as circular, students, board of management etc.
export const getPdfBySections = async (section, archived = false, limit, page, regex = "") => {
  try {
    const encodedRegex = encodeURIComponent(regex);

    if (archived) {
      const res = await api.get(`/notice/archived?section=${section}&limit=${limit}&page=${page}&regex=${encodedRegex}`);
      return res.data;
    }

    const res = await api.get(`/notice?section=${section}&limit=${limit}&page=${page}&regex=${encodedRegex}`);

    return res.data;
  } catch (error) {
    console.error(error)
  }
};

// for the search bar and date picker thingy
export const getAllPdfs = async (
  archived,
  limit,
  page,
  regex = "",
  created_at_gteq,
  created_at_lteq,
  section
) => {

  let query = archived
    ? `/notice/archived?limit=${limit}&page=${page}&regex=${encodeURIComponent(regex)}`
    : `/notice?limit=${limit}&page=${page}&regex=${encodeURIComponent(regex)}`;

  if (created_at_gteq) {
    query += `&created_at_gteq=${encodeURIComponent(created_at_gteq)}`;
  }

  if (created_at_lteq) {
    query += `&created_at_lteq=${encodeURIComponent(created_at_lteq)}`;
  }

  if (section) {
    query += `&section=${section}`;
  }

  const res = await api.get(query);
  return res.data;
};


// get campus by zone 
export const getCampusByZone = async (zoneName) => {
  const res = await api.get('/campus', {
    params: { zone: zoneName }
  });

  return res.data;
}


//? LOGIN
export const login = async ({ email, password }) => {
  try {
    const response = await axios.post(
      `${baseUrl}auth/login`,
      { email, password }
    );

    return response.data;
  } catch (error) {
    console.error("Error while logging:", error);
    throw error;
  }
};


// upload pdf
export const uploadPdf = async (formData) => {
  const token = sessionStorage.getItem("token");
  try {
    const response = await axios.post(`${baseUrl}notice/upload`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response;

  } catch (err) {
    console.error(err.response);
    throw err;
  }
}

// delete pdf by id only admin can
export const deletePdf = async (id) => {
  const token = sessionStorage.getItem("token");

  try {
    const response = await axios.delete(
      `${baseUrl}notice/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // console.log(response);
    return response;
  } catch (err) {
    console.error(err.response);
    throw err;
  }
};


export const updatePdf = async (id, formData) => {
  const token = sessionStorage.getItem("token");
  try {
    const response = await api.put(`notice/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (err) {
    console.error(err.response);
    throw err;
  }
};


// mannually archive pdf
export const archivePdf = async (id, archiveState) => {
  const token = sessionStorage.getItem("token");

  try {
    const response = await api.patch(
      `notice/${id}`,
      { archive: archiveState },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (err) {
    console.error(err.response);
    throw err;
  }
};

//? get result by student credentials: diploma and Btech
export const getStudentResult = async (formData) => {
  const { category, ...data } = formData;
  // console.log(category)
  try {
    const response = await api.post(
      `/result?category=${category}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        }
      }
    );

    return response.data

  } catch (error) {
    // console.error(error);
    throw error;
  }
}

export const changeStudentStatus = async (id, status) => {
  try {
    const response = await api.put(
      `/result/${id}`,
      { status },
      {
        headers: {
          "Content-Type": "application/json",
        }
      }
    )

    return response.data;

  } catch (error) {
    console.error(error);
    throw error;
  }
}


//? UG RESULT
export const getUGStudentResult = async (formData) => {
  try {
    const response = await api.post(
      `/ug`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        }
      }
    );

    return response.data

  } catch (error) {
    // console.error(error);
    throw error;
  }
}


export const changeUGStudentStatus = async (id, status) => {
  try {
    const response = await api.put(
      `/ug/${id}`,
      { status },
      {
        headers: {
          "Content-Type": "application/json",
        }
      }
    )

    return response.data;

  } catch (error) {
    console.error(error);
    throw error;
  }
}


//? PG RESULT
export const getPGStudentResult = async (formData) => {
  try {
    const response = await api.post(
      `/pg`, 
      formData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);  //! devlopment
    throw error;
  }
};

export const changePGStudentStatus = async (id, status) => {
  try {
    const response = await api.put(
      `/pg/${id}`,
      { status },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);  //! development
    throw error;
  }
};
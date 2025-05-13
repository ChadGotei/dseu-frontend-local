import axios from "axios";
import api from "./api";

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


export const updateFacultyResearch = async (id, data) => {
  try {
    console.log("Sending research update for faculty ID:", id, "Data:", data);
    const response = await api.patch(`/faculty/${id}/research`, data, {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
    });
    console.log("Research update response:", response.data);
    return response.data.data.faculty;
  } catch (error) {
    console.error("Error updating faculty research:", error.response?.data || error.message);
    throw error;
  }
};


// get school name by id
export const getSchoolById = async (id) => {
  const response = await api.get(`/departmentSchools`);
  const schools = response.data.data.departmentSchools;

  return schools.find((school) => school._id === id);
}



// get department by school
export const getDepartmentsBySchool = async (id) => {
  const response = await api.get(`/departmentSchools`);
  const data = response.data.data.departmentSchools.find(
    (school) => school._id === id
  );

  return { departments: data.dept_id, name: data.name };
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
  return allPrograms.find((program) => program._id === id) ?? "data not found";
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


// get academic council notices
export const getAcademicCouncilNotices = async () => {
  const response = await api.get('/notice', {
    params: { section: 'academic council' },
  });
  return response.data.data.notices;
};

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
  created_at_lteq
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
      "https://dseu-backend.onrender.com/api/v1/auth/login",
      { email, password }
    );

    sessionStorage.setItem("token", response.data.token);
    sessionStorage.setItem("currentRole", response.data.role);
    sessionStorage.setItem("email", email);


    return response.data;
  } catch (error) {
    console.error("Login karte hue error:", error);
    throw error;
  }
};


// upload pdf
export const uploadPdf = async (formData) => {
  const token = sessionStorage.getItem("token");
  try {
    const response = await axios.post("https://dseu-backend.onrender.com/api/v1/notice/upload",
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
      `https://dseu-backend.onrender.com/api/v1/notice/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);
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

import api from "./api";

export const getDiplomaRound2Result = async (formData) => {
  try {
    const response = await api.post(
      `/result/second`,
      formData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    // console.error(error);  //! devlopment
    throw error;
  }
};

export const changeDiplomaRound2Status = async (id, status) => {
  try {
    const response = await api.put(
      `/result/second/${id}`,
      { status },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    // console.error(error);  //! development
    throw error;
  }
};


//? Btech round 2 result
export const getBtechRound2Result = async (formData) => {
  try {
    const response = await api.post(
      `/btech/second`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        }
      }
    );

    return response.data;

  } catch (error) {
    // console.error(error);
    throw error;
  }
}


export const changeBtechRound2Status = async (id, status) => {
  try {
    const response = await api.put(
      `/btech/second/${id}`,
      { status },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    // console.error(error);  //! development
    throw error;
  }
};

//? DONE :)
export const getUgRound2Result = async (formData) => {
  try {
    const response = await api.post(
      `/ug?round=second`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        }
      }
    );

    return response.data;

  } catch (error) {
    // console.error(error);
    throw error;
  }
}

export const changeUgRound2Status = async (id, status) => {
  try {
    const response = await api.put(
      `/ug/${id}?round=second`,
      { status },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    // console.error(error);  //! development
    throw error;
  }
};


//? Diploma round 3 result

export const getDiplomaRound3Result = async (formData) => {
  try {
    const response = await api.post(
      `/result/third`,
      formData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    // console.error(error);  //! devlopment
    throw error;
  }
};

export const changeDiplomaRound3Status = async (id, status) => {
  try {
    const response = await api.put(
      `/result/third/${id}`,
      { status },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    // console.error(error);  //! development
    throw error;
  }
};


//? Diploma round 4 result
export const getDiplomaRound4Result = async (formData) => {
  try {
    const response = await api.post(
      `/result/fourth`,   //? change
      formData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    // console.error(error);  //! devlopment
    throw error;
  }
};


export const changeDiplomaRound4Status = async (id, status) => {
  try {
    const response = await api.put(
      `/result/fourth/${id}`,   //? change
      { status },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    // console.error(error);  //! development
    throw error;
  }
};


// get result options
export const getProgramAndCourseDetails = async (program) => {
  const token = sessionStorage.getItem("token");

  try {
    const response = await api.get(
      `result/admin?program=${program}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
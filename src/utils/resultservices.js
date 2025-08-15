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
    console.error(error);  //! devlopment
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
    console.error(error);  //! development
    throw error;
  }
};


// TODO: change these two accordingly

//? Diploma round 2 result
export const getBtechRound2Result = async (formData) => {
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

    return response.data;

  } catch (error) {
    // console.error(error);
    throw error;
  }
}


export const changeBtechRound2Status = async (id, status) => {
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
    console.error(error);  //! development
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
    console.error(error);  //! development
    throw error;
  }
};
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

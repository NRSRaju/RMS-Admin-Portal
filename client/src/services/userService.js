import axios from "axios";

//http://localhost:5000/

const API_URL =
  "http://localhost:5000/api/usersSS";

export const getUsers = async ({ page = 1, search = "" } = {}) => {
  const response = await axios.get(API_URL, { params: { page, search } });
  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await axios.put(`${API_URL}/${id}`, userData);
  return response.data;
};

export const approveCertification = async (id) => {
  const response = await axios.put(`${API_URL}/${id}/approve-certification`);
  return response.data;
};

export const rejectCertification = async (id, reason) => {
  const response = await axios.put(`${API_URL}/${id}/reject-certification`, {
    reason,
  });
  return response.data;
};

export const verifyUser = async (id) => {
  const response = await axios.put(`${API_URL}/${id}/verify`);
  return response.data;
};

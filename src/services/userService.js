// src/services/userService.js
import axios from 'axios';

//const API_URL = 'https://backend-qr-code-contact.onrender.com/api/users';
const API_URL = 'https://apimiddleware-1.onrender.com/api/users';
//const API_URL = 'http://192.168.1.6:5000/api/users'; 

export const createUser = async (userData) => {
  const response = await axios.post(API_URL, userData);
  console.log(response);
  return response.data;
};

export const getAllUsers = async () => {
  const response = await axios.get(API_URL);
  console.log(response)
  return response.data.users;
};

export const getUserById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const updateUser = async (id, userData) => {
  console.log(userData);

  const response = await axios.put(`${API_URL}/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const downloadQRCode = async (id, format) => {
  const response = await axios.get(`${API_URL}/${id}/download`, {
    params: { format },
    responseType: 'blob',
  });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `qrcode.${format}`);
  document.body.appendChild(link);
  link.click();
};

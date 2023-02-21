import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/",
});

export const createSession = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  const token = response.data;
  return token;
};

export const getUserInfo = async (token) => {
  const response = await api.get("/users/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getUser = async () => {
  const recoveredUser = localStorage.getItem("user");
  const recoveredId = JSON.parse(recoveredUser);
  const id = recoveredId._id;
  const recoveredToken = localStorage.getItem("token");

  api.defaults.headers.Authorization = `Bearer ${recoveredToken}`;

  return api.get(`/users/profile`);
};

export const getDevice = async () => {
  const recoveredToken = localStorage.getItem("token");

  api.defaults.headers.Authorization = `Bearer ${recoveredToken}`;

  return api.get("/devices");
};

export const addUserDevice = async (listUserDevices) => {
  const recoveredToken = localStorage.getItem("token");

  api.defaults.headers.Authorization = `Bearer ${recoveredToken}`;

  return await api.post("/devices/link", { ...listUserDevices });
};

export const userDeviceList = async () => {
  const recoveredUser = localStorage.getItem("user");
  const recoveredToken = localStorage.getItem("token");
  const recoveredId = JSON.parse(recoveredUser);
  const id = recoveredId._id;

  api.defaults.headers.Authorization = `Bearer ${recoveredToken}`;

  return await api.get(`/users/devices/`);
};

export const userDevice = async (id) => {
  const recoveredToken = localStorage.getItem("token");
  api.defaults.headers.Authorization = `Bearer ${recoveredToken}`;
  return await api.get(`/users/devices/${id}`);
};

export const changeStatus = async (id) => {
  const recoveredToken = localStorage.getItem("token");
  api.defaults.headers.Authorization = `Bearer ${recoveredToken}`;
  return await api.patch(`/users/devices/${id}`);
};

export const deleteDevice = async (selectedDevice) => {
  const recoveredToken = localStorage.getItem("token");
  api.defaults.headers.Authorization = `Bearer ${recoveredToken}`;
  const teste = await api.delete(`/devices/user/${selectedDevice}`);
  return teste;
};

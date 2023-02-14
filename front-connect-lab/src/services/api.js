import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/",
});

export const createSession = async (email, password) => {
  return api.post("/auth/login", { email, password });
};

export const getUser = async () => {
  const recoveredUser = localStorage.getItem("user");
  const recoveredId = JSON.parse(recoveredUser);
  const id = recoveredId._id;
  const recoveredToken = localStorage.getItem("token");

  api.defaults.headers.Authorization = `Bearer ${recoveredToken}`;

  return api.get(`/users/${id}`);
};

export const getDevice = async () => {
  const recoveredToken = localStorage.getItem("token");

  api.defaults.headers.Authorization = `Bearer ${recoveredToken}`;

  return api.get("/devices");
};

export const addUserDevice = async (listUserDevices) => {
  const recoveredToken = localStorage.getItem("token");

  api.defaults.headers.Authorization = `Bearer ${recoveredToken}`;

  return await api.post("/userDevices", { ...listUserDevices });
};

export const userDeviceList = async () => {
  const recoveredUser = localStorage.getItem("user");
  const recoveredToken = localStorage.getItem("token");
  const recoveredId = JSON.parse(recoveredUser);
  const id = recoveredId._id;

  api.defaults.headers.Authorization = `Bearer ${recoveredToken}`;

  return await api.get(`/userDevices/user/${id}`);
};

export const deleteDevice = async (selectedDevice) => {
  const recoveredToken = localStorage.getItem("token");

  api.defaults.headers.Authorization = `Bearer ${recoveredToken}`;

  const teste = await api.delete(`/userDevices/${selectedDevice}`);

  return teste;
};

import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

import { api, createSession, getUserInfo } from "../../services/api";

export const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); //controlar o loading das informações da aplicação

  //useEffect para rodar todas as vezes que a aplicação iniciar
  useEffect(() => {
    const recoveredUser = localStorage.getItem("user");

    if (recoveredUser) {
      setUser(JSON.parse(recoveredUser));
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await createSession(email, password);
    //API criar uma session e retornar user

    const token = response;
    localStorage.setItem("token", token);
    const user = await getUserInfo(token);
    localStorage.setItem("user", JSON.stringify(user));

    api.defaults.headers.Authorization = `Bearer ${token}`;

    setUser(user);
    navigate("/home");
  };

  // user == null
  // authenticated = false

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = null;
    navigate("/");
  };

  return (
    <AuthenticationContext.Provider
      value={{ authenticated: !!user, user, loading, login, logout }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

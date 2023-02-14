import React, { useState, createContext, useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { set } from "react-hook-form";
import {
  AuthenticationProvider,
  AuthenticationContext,
} from "./components/Context/Authentication";

import Home from "./components/Pages/Home/Home";
import Login from "./components/Pages/Login/Login";
import SignUp from "./components/Pages/SignUp/SignUp";
import { UserProfile } from "./components/Pages/UserProfile/UserProfile";
import { Loading } from "./components/Loading/Loading";
import { Devices } from "./components/Pages/Devices/Devices";

export const LabRoutes = () => {
  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthenticationContext);

    if (loading) {
      return <Loading />;
    }

    if (!authenticated) {
      return <Navigate to="/" />;
    }

    return children;
  };
  return (
    <BrowserRouter>
      <AuthenticationProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <Private>
                <Home />
              </Private>
            }
          />
          <Route path="/cadastro" element={<SignUp />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/devices" element={<Devices />} />
        </Routes>
      </AuthenticationProvider>
    </BrowserRouter>
  );
};

export default Routes;

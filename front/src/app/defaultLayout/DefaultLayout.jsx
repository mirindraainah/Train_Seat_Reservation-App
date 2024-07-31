import React, { useEffect, useState } from "react";
import { Outlet, Navigate, Link } from "react-router-dom";
import "./styles.css";
import Header from "./Header";
import { useStateContext } from "../context/ContextProvider";
const DefaultLayout = () => {
  // const navigate = useNavigate();
  const { token } = useStateContext();

  if (!token) {
    return <Navigate to="/trainCompany" />;
  }
  return (
    <div className="defaultLayout">
      <Header />
      <div className="children">
        {" "}
        <Outlet />
      </div>
    </div>
  );
};

export default DefaultLayout;

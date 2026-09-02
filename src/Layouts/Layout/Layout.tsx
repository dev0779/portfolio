import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../Navbar/NavBar";

import "./Layout.scss";

export const Layout = () => {
  return (
    <div className="layout">
      <NavBar />
      <main className="layout__content">
        <Outlet />
      </main>
    </div>
  );
};

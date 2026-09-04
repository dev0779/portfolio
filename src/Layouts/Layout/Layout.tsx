import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../Navbar/NavBar";

import "./Layout.scss";
import Header from "../Header/Header";

export const Layout = () => {
  return (
    /*     <div className="layout">
      <Header />
      <div className="layout">
        <NavBar />
        <main className="layout__content">
            <Outlet />
        </main>
      </div>
    </div> */
    <div className="layout">
      {/*    <Header /> */}

      <div className="layout__body">
        <NavBar />

        <main className="layout__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

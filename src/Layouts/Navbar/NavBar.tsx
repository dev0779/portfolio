import React from "react";
import { Link } from "react-router-dom";

import "./NavBar.scss";
import { IconButton } from "@/shared/Buttons/IconButton/IconButton";

export const NavBar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <IconButton
          icon="HouseSimple"
          label="Home"
          variant="primary"
          size="s"
          popoverSide="right"
          arrow={false}
        />
      </Link>
      <Link to="/about">About</Link>
      <Link to="/projects">
        {" "}
        <IconButton
          icon="Folder"
          label="Project"
          variant="primary"
          size="s"
          popoverSide="right"
        />
        Projects
      </Link>
      <Link to="/contact">Contact</Link>
      <Link to="/designer">Designer</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
};

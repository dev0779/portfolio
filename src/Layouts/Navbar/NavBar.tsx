import React from "react";
import { Link } from "react-router-dom";

import "./NavBar.scss";
import { IconButton } from "@/shared/Buttons/IconButton/IconButton";

export const NavBar = () => {
  return (
    <nav className="navbar">
      SERRA
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
      <Link to="/about">
        <IconButton
          icon="UserSquare"
          label="About"
          variant="primary"
          size="s"
          popoverSide="right"
          arrow={false}
        />
      </Link>
      <Link to="/demoprojects">
        <IconButton
          icon="Folder"
          label="Project"
          variant="primary"
          size="s"
          popoverSide="right"
        />
      </Link>
      <Link to="/contact">
        <IconButton
          icon="AddressBook"
          label="Contact"
          variant="primary"
          size="s"
          popoverSide="right"
        />
      </Link>
      <Link to="/designer">
        <IconButton
          icon="Palette"
          label="Designer"
          variant="primary"
          size="s"
          popoverSide="right"
        />
      </Link>
      {/*       <Link to="/designer">Designer</Link>
      <Link to="/login">Login</Link> */}
    </nav>
  );
};

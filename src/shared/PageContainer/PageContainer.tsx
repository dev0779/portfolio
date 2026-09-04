import React from "react";
import "./PageContainer.scss";

export const PageContainer = ({ children }) => {
  return (
    <div className="pageContainer">
      <div className="pageContainer__inner">{children}</div>
    </div>
  );
};

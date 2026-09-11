import React from "react";

import "./FieldSet.scss";

interface FieldSetProps {
  children: React.ReactNode;
  title: string;
}

export const FieldSet = ({ children, title }: FieldSetProps) => {
  return (
    <div className="fieldSet">
      <h2>{title} </h2>
      <div className="fieldSet__inner">{children}</div>
    </div>
  );
};

import React, { type PropsWithChildren } from "react";

import { useTheme } from "@/hooks";

import "./Container.scss";

export const Container = ({ children }: PropsWithChildren) => {
  const { gridConfig } = useTheme();

  return (
    <div
      className="container"
      style={
        {
          "--container-gutter": gridConfig.gutter,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};

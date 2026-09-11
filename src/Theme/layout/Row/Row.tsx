import React, { type PropsWithChildren } from "react";
import { useTheme } from "@/hooks";

import "./Row.scss";

export const Row = ({ children }: PropsWithChildren) => {
  const { gridConfig } = useTheme();

  return (
    <div
      className="row"
      style={{
        marginLeft: `-${gridConfig.gutter}`,
        marginRight: `-${gridConfig.gutter}`,
      }}
    >
      {children}
    </div>
  );
};

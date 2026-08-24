import React, { type PropsWithChildren } from "react";
import { useTheme } from "@/hooks";

export const Row = ({ children }: PropsWithChildren) => {
  const { gridConfig } = useTheme();

  return (
    <div
      className="flex flex-wrap"
      style={{
        marginLeft: `-${gridConfig.gutter}`,
        marginRight: `-${gridConfig.gutter}`,
      }}
    >
      {children}
    </div>
  );
};

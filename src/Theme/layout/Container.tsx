import React, { type PropsWithChildren } from "react";
import { useTheme } from "@/hooks";

export const Container = ({ children }: PropsWithChildren) => {
  const { gridConfig } = useTheme();

  return (
    <div
      className="mx-auto"
      style={{
        paddingLeft: gridConfig.gutter,
        paddingRight: gridConfig.gutter,
        maxWidth: "100%",
      }}
    >
      {children}
    </div>
  );
};

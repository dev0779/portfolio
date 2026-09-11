import React from "react";

import { useTheme } from "@/hooks/useTheme";

import "./Col.scss";

interface ColProps {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  children: React.ReactNode;
}

export const Col = ({ xs, sm, md, lg, xl, children }: ColProps) => {
  const { gridConfig } = useTheme();

  const getWidthPercent = (span?: number) => {
    if (!span) return undefined;

    return `${(span / gridConfig.columns) * 100}%`;
  };

  const style = {
    "--col-xs": getWidthPercent(xs),
    "--col-sm": getWidthPercent(sm),
    "--col-md": getWidthPercent(md),
    "--col-lg": getWidthPercent(lg),
    "--col-xl": getWidthPercent(xl),
    "--col-gutter": gridConfig.gutter,
  } as React.CSSProperties;

  return (
    <div className="col" style={style}>
      {children}
    </div>
  );
};

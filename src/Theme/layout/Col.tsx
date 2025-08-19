import React from "react";
import { useTheme } from "@/Hooks/useTheme";


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

  const getWidthPercent = (span?: number) =>
    span ? `${(span / gridConfig.columns) * 100}%` : "100%";

  const style: React.CSSProperties = {
    paddingLeft: gridConfig.gutter,
    paddingRight: gridConfig.gutter,
    width: getWidthPercent(xs),
  };

  const className = `
    ${sm ? `sm:w-[${getWidthPercent(sm)}]` : ""}
    ${md ? `md:w-[${getWidthPercent(md)}]` : ""}
    ${lg ? `lg:w-[${getWidthPercent(lg)}]` : ""}
    ${xl ? `xl:w-[${getWidthPercent(xl)}]` : ""}
  `;

  return <div className={className} style={style}>{children}</div>;
};

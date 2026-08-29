import React from "react";
import { Icon } from "../Icons/Icon";
import { useTheme } from "@/hooks";

interface LoaderProps {
  size: "xs" | "s" | "l" | "xl";
  color?: string;
  text?: string | boolean;
}

const SIZES = {
  xs: 8,
  s: 12,
  l: 20,
  xl: 100,
} as const;

export const Loader = ({ size, color, text = false }: LoaderProps) => {
  const { themeState } = useTheme();

  const loaderSize = SIZES[size];
  const loaderColor = color ?? themeState.primaryColor;

  if (size === "xl") {
    return (
      <div className="loader__main">
        <div className="loader__main__inner">
          <span className="loader__main__spinner">
            <Icon name="SpinnerGap" size={loaderSize} color={loaderColor} />
          </span>

          <span className="loader__main__text" style={{ color: loaderColor }}>
            {text ? text : "Loading ..."}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="loader">
      <span className="loader__spinner">
        <Icon name="SpinnerGap" size={loaderSize} color={loaderColor} />
      </span>

      {text && (
        <span className="loader__text" style={{ color: loaderColor }}>
          {text === true ? "Loading ..." : text}
        </span>
      )}
    </div>
  );
};

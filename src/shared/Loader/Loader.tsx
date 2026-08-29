import React from "react";
import { Icon } from "../Icons/Icon";
import { useTheme } from "@/hooks";
import "./Loader.scss";

interface LoaderProps {
  size: "xs" | "s" | "l" | "xl";
  color?: string;
  text?: string | boolean;
}

const SIZES = {
  xs: { loader: 16, text: 12 },
  s: { loader: 20, text: 14 },
  l: { loader: 32, text: 16 },
  xl: { loader: 116, text: 18 },
} as const;

export const Loader = ({ size, color, text = false }: LoaderProps) => {
  const { themeState } = useTheme();

    const loaderSize = SIZES[size].loader;
    const loaderText = SIZES[size].text;
  const loaderColor = color ?? themeState.primaryColor;

  if (size === "xl") {
    return (
      <div className="loader__main">
        <div className="loader__main__inner">
          <span className="loader__spinner">
            <Icon name="SpinnerGap" size={loaderSize} color={loaderColor} />
          </span>

          <span className="loader__main__text" style={{ color: loaderColor, fontSize: loaderText}}>
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
        <span className="loader__text" style={{ color: loaderColor, fontSize: loaderText }}>
          {text === true ? "Loading ..." : text}
        </span>
      )}
    </div>
  );
};

import clsx from "clsx";
import React from "react";
import type { CSSProperties } from "react";

import "./Tabs.scss";

interface TabOption {
  label?: string;
  disabled?: boolean;
  slug?: string;
}

interface TabProps {
  settings?: CSSProperties;
  options?: TabOption[];
  activeIndex?: number;
  onClick?: (index: number) => void;
}

export const Tabs = ({ settings, options, activeIndex, onClick }: TabProps) => {
  return (
    <div style={settings} className="tabs">
      {options.map((option, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            className={clsx(
              "tabs__button",
              option.disabled && "tabs__button--disabled",
              isActive && "tabs__button--active",
            )}
            key={option.label}
            id={option.label + "_" + index}
            disabled={option.disabled}
            onClick={() => onClick?.(index)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

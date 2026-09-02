import { Icon } from "@/shared/Icons/Icon";
import { Tooltip } from "@/shared/Tooltip";
import { Popover } from "radix-ui";
import React, { useState } from "react";

import "./IconButton.scss";

interface IconButtonProps {
  label?: string;
  icon?: string;
  variant?: "primary" | "secondary" | "tertiary";
  color?: string;
  iconHoverColor?: string;
  iconColor?: string;
  size?: "s" | "m" | "l";
  iconWeight?: "regular" | "bold" | "fill" | "thin" | "light";
  type?: "primary" | "secondary";
  arrow?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  interactive?: boolean;
  popoverSide?: "top" | "right" | "bottom" | "left";
  popoverSideOffset?: number;
  popoverColor?: string;
  className?: string;
}

const SIZES = {
  s: { width: 24, height: 24 },
  m: { width: 36, height: 36 },
  l: { width: 46, height: 46 },
} as const;

const ICONSIZES = {
  s: 16,
  m: 24,
  l: 40,
};

const VARIANTCOLOR = {
  primary: { color: "white", hover: "white" },
  secondary: { color: "blue", hover: "white" },
  tertiary: { color: "blue", hover: "white" },
};

export const IconButton = ({
  label,
  size = "s",
  variant = "primary",
  icon = "RocketLaunch",
  iconColor = "black",
  iconHoverColor,
  iconWeight = "regular",
  arrow = false,
  disabled,
  children,
  onClick,
  interactive = false,
  popoverSide = "bottom",
  popoverSideOffset = 5,
  popoverColor = "white",
  className,
}: IconButtonProps) => {
  const buttonSize = SIZES[size];

  const iconSize = ICONSIZES[size];
  const color = VARIANTCOLOR[variant];

  if (interactive) {
    return (
      <Popover.Root>
        <Popover.Trigger asChild>
          <button
            className={`
              iconButton
              iconButton--${variant}
              ${disabled ? "iconButton--disabled" : ""}`}
            onClick={onClick}
            disabled={disabled}
            style={buttonSize}
          >
            <Icon
              name={icon as React.ComponentProps<typeof Icon>["name"]}
              color={disabled ? "gray" : color.color}
              weight={iconWeight}
              size={iconSize}
            />
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            className={`iconButton-popover ${className ?? ""}`}
            side={popoverSide}
            sideOffset={popoverSideOffset}
            style={{ backgroundColor: popoverColor }}
          >
            {children}
            {arrow && (
              <Popover.Arrow
                className="iconButton-arrow"
                style={{ fill: popoverColor }}
              />
            )}
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    );
  }
  return (
    <>
      <Tooltip content={label}>
        <button
          className={`iconButton iconButton--${variant} ${disabled ? "iconButton--disabled" : ""}`}
          onClick={disabled ? undefined : onClick}
          disabled={disabled}
          style={buttonSize}
        >
          <Icon
            name={icon as React.ComponentProps<typeof Icon>["name"]}
            color={
              disabled ? "gray" : variant === "primary" ? "white" : iconColor
            }
            weight={iconWeight}
            size={iconSize}
            className={`iconButtonIcon`}
          />
        </button>
      </Tooltip>
    </>
  );
};

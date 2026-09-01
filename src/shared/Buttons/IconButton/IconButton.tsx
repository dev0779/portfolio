import { Icon } from "@/shared/Icons/Icon";
import { Tooltip } from "@/shared/Tooltip";
import { Popover } from "radix-ui";
import React from "react";

interface IconButtonProps {
  label?: string;
  icon?: string;
  variant?: "primary" | "secondary" | "tertiary";
  color?: string;
  iconHoverColor?: string;
  iconColor?: string;
  size?: "s" | "m" | "l";
  iconSize?: number;
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
  s: { width: 20, height: 20 },
  m: { width: 26, height: 26 },
  l: { width: 32, height: 32 },
} as const;

export const IconButton = ({
  label,
  size = "s",
  variant = "primary",
  color,
  icon = "RocketLaunch",
  iconSize = 12,
  iconColor = "black",
  iconHoverColor,
  iconWeight = "regular",
  arrow = false,
  disabled,
  children,
  onClick,
  interactive = false,
  popoverSide = "right",
  popoverSideOffset = 5,
  popoverColor = "white",
  className,
}: IconButtonProps) => {
  const buttonSize = SIZES[size];
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
              color={disabled ? "gray" : iconColor}
              hoverColor={iconHoverColor}
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
            color={disabled ? "gray" : iconColor}
            hoverColor={iconHoverColor}
            weight={iconWeight}
            size={iconSize}
          />
        </button>
      </Tooltip>
    </>
  );
};

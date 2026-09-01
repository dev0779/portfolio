import { Icon } from "@/shared/Icons/Icon";
import { IconTooltip, Tooltip } from "@/shared/Tooltip";
import { Popover } from "radix-ui";
import React from "react";

interface IconButtonProps {
  label?: string;
  icon?: string;
  color?: string;
  iconHoverColor?: string;
  iconColor?: string;
  iconSize?: number;
  size?: number;
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

export const IconButton = ({
  label,
  size,
  type = "primary",
  icon,
  iconSize,
  iconColor,
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
  if (interactive) {
    return (
      <Popover.Root>
        <Popover.Trigger asChild>
          <button
            className={`iconButton ${disabled ? "iconButton--disabled" : ""}`}
            onClick={onClick}
            disabled={disabled}
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
          className={`iconButton ${disabled ? "iconButton--disabled" : ""}`}
          onClick={disabled ? undefined : onClick}
          disabled={disabled}
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

import { Icon } from "@/shared/Icons/Icon";
import React, { type JSX } from "react";
import { Popover } from "radix-ui";

import "./IconTooltip.scss";
import { Tooltip } from "../Tooltip/Tooltip";

interface IconTooltip {
  content?: string;
  name: string;
  color?: string;
  hoverColor?: string;
  weight?: "regular" | "bold" | "fill" | "thin" | "light";
  size?: number;
  interactive?: boolean;
  children?: React.ReactNode;
  popoverSide?: "top" | "right" | "bottom" | "left";
  popoverSideOffset?: number;
  popoverColor?: string;
  className?: string;
  arrow?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export const IconTooltip = ({
  content,
  name,
  color = "black",
  hoverColor,
  weight = "regular",
  size = 15,
  interactive = false,
  children,
  popoverSide = "right",
  popoverSideOffset = 5,
  popoverColor = "white",
  className,
  arrow = true,
  onClick,
  disabled,
}: IconTooltip): JSX.Element => {
  if (interactive) {
    return (
      <Popover.Root
        onOpenChange={(open) => {
          if (open && !disabled) {
            onClick?.();
          }
        }}
      >
        <Popover.Trigger asChild>
          <span
            className={`icon-tooltip ${disabled ? "icon-tooltip--disabled" : ""}`}
          >
            <Icon
              name={name as React.ComponentProps<typeof Icon>["name"]}
              color={disabled ? "gray" : color}
              hoverColor={hoverColor}
              weight={weight}
              size={size}
            />
          </span>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            className={`icon-tooltip-popover ${className ?? ""}`}
            side={popoverSide}
            sideOffset={popoverSideOffset}
            style={{ backgroundColor: popoverColor }}
          >
            {children}
            {arrow && (
              <Popover.Arrow
                className="icon-tooltip-arrow"
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
      <Tooltip content={content} onClick={disabled ? undefined : onClick}>
        <span
          className={`icon-tooltip ${disabled ? "icon-tooltip--disabled" : ""}`}
        >
          <Icon
            name={name as React.ComponentProps<typeof Icon>["name"]}
            color={disabled ? "gray" : color}
            hoverColor={hoverColor}
            weight={weight}
            size={size}
          />
        </span>
      </Tooltip>
    </>
  );
};

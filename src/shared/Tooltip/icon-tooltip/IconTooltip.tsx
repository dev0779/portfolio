import { Icon } from "@/shared/Icons/Icon";
import React, { type JSX } from "react";
import { type Props } from "tippy.js";
import { Popover } from "radix-ui";

import "./IconTooltip.scss";

interface IconTooltip {
  tooltip?: string;
  name: string;
  color?: string;
  hoverColor?: string;
  weight?: "regular" | "bold" | "fill" | "thin" | "light";
  size?: number;
  options?: Partial<Props>;
  interactive?: boolean;
  children?: React.ReactNode;
  popoverSide?: "top" | "right" | "bottom" | "left";
  popoverSideOffset?: number;
  popoverColor?: string;
  className?: string;
  arrow?: boolean;
  onClick?: () => void;
}

export const IconTooltip = ({
  tooltip,
  name,
  color = "black",
  hoverColor,
  weight = "regular",
  size = 15,
  options = { arrow: true, placement: "top", offset: [0, 10] },
  interactive = false,
  children,
  popoverSide = "right",
  popoverSideOffset = 5,
  popoverColor = "white",
  className,
  arrow = true,
  onClick,
}: IconTooltip): JSX.Element => {
  if (interactive) {
    return (
      <Popover.Root
        onOpenChange={(open) => {
          if (open) {
            onClick?.();
          }
        }}
      >
        <Popover.Trigger asChild>
          <span className="icon-tooltip" tooltip="click to open">
            <Icon
              name={name as React.ComponentProps<typeof Icon>["name"]}
              color={color}
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
      <span
        className="icon-tooltip"
        tooltip={tooltip}
        options={JSON.stringify(options)}
        onClick={onClick}
      >
        <Icon
          name={name as React.ComponentProps<typeof Icon>["name"]}
          color={color}
          hoverColor={hoverColor}
          weight={weight}
          size={size}
        />
      </span>
    </>
  );
};

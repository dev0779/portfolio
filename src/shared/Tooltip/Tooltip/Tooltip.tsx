import * as RadixTooltip from "@radix-ui/react-tooltip";
import "./Tooltip.scss";
import clsx from "clsx";

type TooltipSide = NonNullable<
  React.ComponentProps<typeof RadixTooltip.Content>["side"]
>;

interface TooltipProps {
  content?: React.ReactNode;
  side?: TooltipSide;
  sideOffset?: number;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  arrow?: boolean;
}

export const Tooltip = ({
  content,
  children,
  side = "top",
  sideOffset = 5,
  className,
  onClick,
  arrow = true,
}: TooltipProps) => {
  return (
    <RadixTooltip.Root>
      <RadixTooltip.Trigger asChild onClick={onClick}>
        {children}
      </RadixTooltip.Trigger>

      <RadixTooltip.Portal>
        <RadixTooltip.Content
          side={side}
          sideOffset={sideOffset}
          className={clsx("TooltipContent", className)}
        >
          {content}
          {arrow && <RadixTooltip.Arrow className="TooltipArrow" />}
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  );
};

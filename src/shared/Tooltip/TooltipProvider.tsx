import React from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";

interface TooltipProviderProps {
  children: React.ReactNode;
}

export const TooltipProvider = ({
  children,
}: TooltipProviderProps): React.ReactElement => {
  return (
    <RadixTooltip.Provider delayDuration={0}>{children}</RadixTooltip.Provider>
  );
};

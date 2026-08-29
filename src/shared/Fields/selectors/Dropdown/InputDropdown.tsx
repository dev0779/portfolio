import React, { type JSX } from "react";
import { Popover } from "radix-ui";

import "./InputDropdown.scss";

interface DropdownProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  trigger: React.ReactNode;
}

export const InputDropdown = ({
  open,
  onOpenChange,
  children,
  trigger,
}: DropdownProps): JSX.Element => {
  return (
    <Popover.Root
      open={open}
      onOpenChange={(value) => {
        onOpenChange(value);
      }}
    >
      <Popover.Anchor asChild>{trigger}</Popover.Anchor>

      <Popover.Portal>
        <Popover.Content
          className="input-dropdown"
          side="bottom"
          align="start"
          sideOffset={0}
          avoidCollisions
          onOpenAutoFocus={(event) => {
            event.preventDefault();
          }}
        >
          {children}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

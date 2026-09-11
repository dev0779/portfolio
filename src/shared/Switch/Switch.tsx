import React from "react";
import { Switch as RadixSwitch } from "radix-ui";

import "./Switch.scss";
import clsx from "clsx";

interface SwitchProps {
  checked: boolean;
  labels?: string[];
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const Switch = ({
  checked,
  labels,
  onCheckedChange,
  disabled,
}: SwitchProps) => {
  return (
    <div className="switchWrapper">
      {labels && (
        <span
          className={clsx(
            "switchWrapper__labels",
            !checked && "switchWrapper--selected",
          )}
        >
          {labels[0]}{" "}
        </span>
      )}
      <RadixSwitch.Root
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className="switch"
      >
        <RadixSwitch.Thumb className="switch__thumb" />
      </RadixSwitch.Root>
      {labels && (
        <span
          className={clsx(
            "switchWrapper__labels",
            checked && "switchWrapper--selected",
          )}
        >
          {labels[1]}{" "}
        </span>
      )}
    </div>
  );
};

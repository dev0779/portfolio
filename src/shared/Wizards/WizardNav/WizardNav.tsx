import { Icon } from "@/shared/Icons/Icon";
import clsx from "clsx";
import React from "react";

import "./WizardNav.scss";

interface WizardItem {
  label?: string;
  name?: string;
  slug?: string;
  disabled?: boolean;
  active?: boolean;
  isChecked?: boolean;
  percentage?: boolean;
  icon?: React.ComponentProps<typeof Icon>["name"];
}

interface WizardNavProps {
  steps?: WizardItem[];
  activeIndex?: number;
  onClick?: (step: WizardItem) => void;
}

export const WizardNav = ({ steps, activeIndex, onClick }: WizardNavProps) => {
  return (
    <div className="wizardNav">
      <div className="wizardNav__wrapper ">
        {steps.map((step: WizardItem, index) => {
          return (
            <>
              <button
                className={clsx(
                  "wizardNav__button",
                  index === activeIndex && "wizardNav--active",
                )}
                key={index}
                onClick={() => onClick?.(step)}
              >
                {step.icon && (
                  <Icon
                    name={step.icon}
                    color={index === activeIndex ? "white" : "black"}
                  />
                )}
                {!step.icon && step.label}
              </button>
            </>
          );
        })}
      </div>
    </div>
  );
};

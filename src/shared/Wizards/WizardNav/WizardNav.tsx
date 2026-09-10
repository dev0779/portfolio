import { Icon } from "@/shared/Icons/Icon";
import clsx from "clsx";
import React from "react";

import "./WizardNav.scss";

export interface WizardItem {
  id?: number;
  label?: string;
  name?: string;
  disabled?: boolean;
  icon?: React.ComponentProps<typeof Icon>["name"];
  title?: string;
  description?: string;
  info?: string;
  element?: React.ReactNode;
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
            <React.Fragment key={step.id ?? index}>
              <button
                className={clsx(
                  "wizardNav__button",
                  index === activeIndex && "wizardNav--active",
                  index > activeIndex && "wizardNav--completed",
                )}
                key={index}
                onClick={() => onClick?.(step)}
                disabled={step.disabled}
              >
                {step.icon && (
                  <Icon
                    name={step.icon}
                    color={index === activeIndex ? "white" : "black"}
                  />
                )}
                {step.label}
              </button>
            </React.Fragment>
          );
        })}
      </div>
      <div className="wizardNav__navBarWrapper">
        <div
          className="wizardNav__navBar"
          style={{ width: steps[activeIndex]?.percentage ?? "0%" }}
        ></div>
      </div>
    </div>
  );
};

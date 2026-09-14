import type { StepOption } from "@/context/UserContext/ProductContext";
import { Icon } from "@/shared/Icons/Icon";
import clsx from "clsx";
import React from "react";

import "./WizardInfo.scss";
import { Accordion } from "@/shared/Accordion/Accordion";

interface WizardInfoProps {
  step?: StepOption;
  progress?: number | string;
  completed?: boolean;
}

export const WizardInfo = ({ step, progress, completed }: WizardInfoProps) => {
  if (!step) {
    return;
  }

  return (
    <div className="wizardInfo">
      <div className="wizardInfo__inner">
        <div className="wizardInfo__header">
          <div
            className={clsx(
              "wizardInfo__icon",
              completed && "wizardInfo__icon--completed",
            )}
          >
            <Icon name={step.icon} size={26} color="white" />
          </div>
          <div className="wizardInfo__label">{step.label}</div>
        </div>

        <div className="wizardInfo__body">
                  <Accordion title={step.title} isOpen={true}>
            <div>{step.description}</div>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

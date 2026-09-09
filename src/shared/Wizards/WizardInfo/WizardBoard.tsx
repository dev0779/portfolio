import { Icon } from "@/shared/Icons/Icon";
import React from "react";

import "./WizardBoard.scss";
import { Accordion } from "@/shared/Accordion/Accordion";

export interface WizardItem {
  id?: number;
  label?: string;
  name?: string;
  slug?: string;
  disabled?: boolean;
  active?: boolean;
  isChecked?: boolean;
  percentage?: string;
  icon?: React.ComponentProps<typeof Icon>["name"];
  title?: string;
  description?: string;
  info?: string;
}

interface WizardBoardProps {
  steps?: WizardItem[];
  activeIndex?: number;
  onClick?: (step: WizardItem) => void;
}

export const WizardBoard = ({
  steps,
  activeIndex,
  onClick,
}: WizardBoardProps) => {
  return (
    <div className="wizardBoard">
        <div className="wizardBoard__wrapper">
        {steps.map((step, index) => {
               
          return (
            <Accordion isOpen={step.active || activeIndex === index} onClick={() => onClick?.(step)} header={
              <div className="wizardBoard__header">
                {step.isChecked && <Icon name="CheckCircle" color="green" size={16 } />}
                <Icon name={step.icon} color="black" size={16}></Icon>
                <span>{step.title}</span>
              </div>
            }>
              <div className="wizardBoard__body">{step.description}</div>
            </Accordion>
          )
             })}
      </div>
    </div>
  );
};

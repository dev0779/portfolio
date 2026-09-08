import { Icon } from "@/shared/Icons/Icon";
import React from "react";

import "./WizardBoard.scss";

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
              
      </div>
    </div>
  );
};

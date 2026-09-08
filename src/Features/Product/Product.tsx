import {
  WizardNav,
  type WizardItem,
} from "@/shared/Wizards/WizardNav/WizardNav";
import React, { useState } from "react";
import "./Product.scss";
import { Accordion } from "@/shared/Accordion/Accordion";

export const Product = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const steps: WizardItem[] = [
    {
      id: 1,
      label: "1",
      name: "step-one",
      slug: "step-one",
      disabled: false,
      icon: "Info",
      percentage: "0%",
    },
    {
      id: 2,
      label: "2",
      name: "step-two",
      slug: "step-two",
      disabled: false,
      icon: "Info",
      percentage: "30%",
    },
    {
      id: 3,
      label: "3",
      name: "step-three",
      slug: "step-three",
      disabled: false,
      icon: "Info",
      percentage: "60%",
    },
    {
      id: 4,
      label: "4",
      name: "step-four",
      slug: "step-four",
      disabled: false,
      icon: "Info",
      percentage: "75%",
    },
    {
      id: 5,
      label: "5",
      name: "step-five",
      slug: "step-five",
      disabled: false,
      icon: "Info",
      percentage: "90%",
    },
  ];

  return (
    <div className="product">
      <WizardNav steps={steps} activeIndex={currentIndex} />I am a product
      <Accordion name="hello">
        <span>im a string</span>
      </Accordion>
    </div>
  );
};

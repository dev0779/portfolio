import React, { useState } from "react";
import { Icon } from "../Icons/Icon";

import "./Accordion.scss";
import clsx from "clsx";

interface AccordionProps {
  header?: React.ReactNode;
  name?: string;
  isOpen?: boolean;
  color?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  border?: boolean;
  borderBottom?: boolean;
  showActive?: boolean;
  variante?: "active";
}
export const Accordion = ({
  onClick,
  isOpen,
  name,
  color = "blue",
  header,
  children,
  border = true,
  borderBottom = false,
  showActive,
}: AccordionProps) => {
  const [open, setOpen] = useState(isOpen ?? false);

  return (
    <div
      className={clsx(
        "accordion",
        border && "accordion--border",
        borderBottom && "accordion--borderBottom",
      )}
    >
      <div
        className={clsx(
          "accordion__header",
          showActive && open && "accordion__header--active",
        )}
        onClick={() => {
          setOpen(!open);
          onClick?.();
        }}
      >
        {header && <div className="accordion__header__label">{header}</div>}
        {name && <div className="accordion__header__labelName">{name}</div>}

        <Icon name={open ? "CaretUp" : "CaretDown"} color={color} />
      </div>
      {open && <div className="accordion__body">{children}</div>}
    </div>
  );
};

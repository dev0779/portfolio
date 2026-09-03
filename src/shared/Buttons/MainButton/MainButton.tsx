import { Icon } from "@/shared/Icons/Icon";
import { Loader } from "@/shared/Loader/Loader";
import clsx from "clsx";
import React, { type JSX } from "react";

import "./MainButton.scss";

interface MainButtonProps {
  variant?: "primary" | "secondary";
  size?: "s" | "m" | "l";
  label: string;
  icon?: React.ComponentProps<typeof Icon>["name"];
  iconPosition?: "left" | "right";
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  apiError?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const SIZES = {
  s: 18,
  m: 20,
  l: 24,
};

const VARIANT = {
  primary: "white",
  secondary: "#1560BD",
  tertiary: "white",
};

export const MainButton = ({
  variant = "primary",
  size = "m",
  label,
  icon,
  iconPosition = "left",
  type = "button",
  loading = false,
  disabled = false,
  onClick,
  className,
}: MainButtonProps): JSX.Element => {
  const colors = VARIANT[variant];
  const sizes = SIZES[size];
  const isDisabled = disabled || loading;
  return (
    <>
      <button
        className={clsx(
          `mainButton mainButton--${variant} mainButton--${size}`,
          isDisabled && "mainButton--disabled",
          className,
        )}
        type={type}
        onClick={onClick}
        disabled={isDisabled}
      >
        {loading && <Loader size="s" color={colors} text={true} />}
        {icon && !loading && (
          <>
            {iconPosition === "left" && (
              <>
                <Icon name={icon} size={sizes} color={colors} />
                <span className="mainButton__label">{label}</span>
              </>
            )}
            {iconPosition === "right" && (
              <>
                <span className="mainButton__label">{label}</span>
                <Icon name={icon} size={sizes} color={colors} />
              </>
            )}
          </>
        )}
        {!icon && label && !loading && (
          <span className="mainButton__label">{label}</span>
        )}
      </button>
    </>
  );
};

export default MainButton;

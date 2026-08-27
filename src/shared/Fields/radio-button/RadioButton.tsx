import { Icon } from "@/shared/Icons/Icon";
import { useTheme } from "@/hooks";

import "./RadioButton.scss";
import Tippy from "@tippyjs/react";

export type RadioValue = string | number | boolean;

type RadioProps<T extends RadioValue = string> = {
  name: string;
  label: string;
  info?: string;
  value: T;
  checked: boolean;
  disabled?: boolean;
  error?: boolean;
  onChange: (value: T) => void;
  onBlur: (value: T) => void;
};

export const Radio = <T extends RadioValue>({
  name,
  label,
  info,
  value,
  checked,
  disabled = false,
  error = false,
  onChange,
  onBlur,
}: RadioProps<T>) => {
  const { themeState } = useTheme();

  const iconColor = error
    ? themeState.errorColor
    : disabled
      ? themeState.grayColor
      : checked
        ? themeState.primaryColor
        : themeState.blackColor;

  return (
    <label
      className={`radio-button__option ${
        disabled ? "radio-button__option--disabled" : ""
      }`}
    >
      <input
        type="radio"
        name={name}
        value={String(value)}
        checked={checked}
        onChange={() => onChange(value)}
        disabled={disabled}
        onBlur={() => onBlur(value)}
      />

      <Icon
        name={checked ? "RadioButton" : "Circle"}
        weight={checked ? "fill" : "regular"}
        size={20}
        color={iconColor}
      />

      <span className="radio-button__text">
        {label}
        {info && (
          <Tippy content={info}>
            <span className="radio-button__info">
              <Icon name="Info" color="blue" weight="fill" size={16} />
            </span>
          </Tippy>
        )}
      </span>
    </label>
  );
};

import { Icon } from "@/shared/Icons/Icon";
import { useTheme } from "@/hooks";

import "./RadioButton.scss";

export type RadioValue = string | number | boolean;

type RadioProps<T extends RadioValue = string> = {
  name: string;
  label: string;
  value: T;
  checked: boolean;
  disabled?: boolean;
  error?: boolean;
  onChange: (value: T) => void;
};

export const Radio = <T extends RadioValue>({
  name,
  label,
  value,
  checked,
  disabled = false,
  error = false,
  onChange,
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
    <div className="radio">
      <label
        className={`radio__wrapper ${disabled ? "radio__wrapper--disabled" : ""}`}
      >
        <input
          type="radio"
          name={name}
          checked={checked}
          onChange={() => onChange(value)}
          disabled={disabled}
        />

        <Icon
          name={checked ? "RadioButton" : "Circle"}
          weight={checked ? "fill" : "regular"}
          size={20}
          color={iconColor}
        />

        <span className="radio__text">{label}</span>
      </label>
    </div>
  );
};

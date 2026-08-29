import { Icon } from "@/shared/Icons/Icon";
import { useTheme } from "@/hooks";

import "./RadioButton.scss";
import { IconTooltip } from "@/shared/Tooltip/icon-tooltip/IconTooltip";


export type RadioValue = string | number | boolean;

type RadioProps<T extends RadioValue = string> = {
  name: string;
  label: string;
  info?: string;
  value: T;
  checked: boolean;
  disabled?: boolean;
  error?: boolean;
  interactive?: boolean;
  tooltipChildren?: React.ReactNode;
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
  interactive,
  tooltipChildren,
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
          <IconTooltip
            name="Info"
            weight="regular"
            color="Black"
            size={16}
            tooltip={info}
            interactive={interactive}
            className="tool"
            popoverColor="black"
          >
            {tooltipChildren}
          </IconTooltip>
        )}
      </span>
    </label>
  );
};

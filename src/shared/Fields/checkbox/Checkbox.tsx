import { useTheme } from "@/hooks";
import { Icon } from "@/shared/Icons/Icon";
import { useMemo, useRef, type JSX } from "react";
import { useFormContext } from "react-hook-form";
import "./Checkbox.scss";
import { IconTooltip } from "@/shared/Tooltip/icon-tooltip/IconTooltip";

interface CheckboxProps {
  name: string;
  label: string;
  info?: string;
  required?: string | boolean;
  disabled?: boolean;
  readOnly?: boolean;
  hideError?: boolean;
  value?: string;
  checked?: boolean;
  interactive?: boolean;
  tooltipChildren?: React.ReactNode;
  onChange?: (checked: boolean) => void;
  onBlur?: (checked: boolean) => void;
}

export const Checkbox = ({
  name,
  label,
  info,
  value,
  required,
  disabled,
  readOnly,
  checked,
  onChange,
  onBlur,
  interactive,
  tooltipChildren,
}: CheckboxProps): JSX.Element => {
  const { themeState } = useTheme();
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const checkboxRef = useRef<HTMLInputElement | null>(null);

  const watchChecked = watch(name);
  const currentChecked = checked ?? watchChecked;

  const { ref, ...rest } = register(name, {
    required,
    onChange: (event) => {
      onChange?.(event.target.checked);
    },
    onBlur: () => {
      onBlur?.(checkboxRef.current?.checked ?? false);
    },
  });

  const labelToRender = useMemo(() => {
    if (label) {
      if (typeof label === "string") {
        return <p>{required ? `${label} *` : label}</p>;
      } else {
        return required ? <>{label} * </> : label;
      }
    } else {
      return null;
    }
  }, [label, required]);

  const iconColor = errors[name]
    ? themeState.errorColor
    : disabled
      ? themeState.grayColor
      : checkboxRef.current === document.activeElement
        ? themeState.primaryColor
        : themeState.blackColor;

  return (
    <div className="checkbox">
      <div className="checkbox__wrapper">
        <input
          id={name}
          type="checkbox"
          disabled={disabled}
          readOnly={readOnly}
          value={value && value}
          {...rest}
          {...(checked !== undefined
            ? {
                checked,
              }
            : {})}
          ref={(e) => {
            ref(e);
            checkboxRef.current = e;
          }}
        />
        <label htmlFor={name} className="checkbox__box">
          <Icon
            name={currentChecked ? "CheckSquare" : "Square"}
            size={20}
            weight={currentChecked ? "fill" : "regular"}
            color={iconColor}
          />
          <span>
            {labelToRender}
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
      </div>
      {errors[name] && (
        <span className="checkbox__error">
          {errors[name]?.message?.toString()}
        </span>
      )}
    </div>
  );
};

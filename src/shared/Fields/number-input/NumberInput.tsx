import { useRef, type JSX } from "react";
import { useFormContext, type RegisterOptions } from "react-hook-form";
import { ErrorMessage } from "../fields-styled/Fields.styled";
import * as PhosphorIcons from "phosphor-react";
import { Icon } from "../../Icons/Icon";
import { useTheme } from "@/hooks";
import { IconTooltip } from "@/shared/Tooltip/IconTooltip/IconTooltip";

import "./../Fields.scss";
import { requiredErrorMessage } from "@/utils/errors";
interface NumberInputProps {
  name: string;
  label: string;
  info?: string;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  readOnly?: boolean;
  defaultValue?: number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  validate?: RegisterOptions["validate"];
  required?: boolean | string;
  min?: number;
  max?: number;
  step?: number;
  error?: string;
  svg?: keyof typeof PhosphorIcons;
  interactive?: boolean;
  tooltipChildren?: React.ReactElement;
}

export const NumberInput = ({
  name,
  required,
  label,
  info,
  placeholder,
  validate,
  onChange,
  onBlur,
  disabled,
  readOnly,
  defaultValue,
  min,
  max,
  step,
  svg,
  error,
  interactive,
  tooltipChildren,
}: NumberInputProps): JSX.Element => {
  const { themeState } = useTheme();

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const numberInputRef = useRef<HTMLInputElement | null>(null);

  const { ref, ...rest } = register(name, {
    required: required ? requiredErrorMessage : false,
    validate,
    onChange,
    onBlur,
    setValueAs: (value) => (value === "" ? null : Number(value)),
  });

  const iconColor = errors[name]
    ? themeState.errorColor
    : disabled
      ? themeState.grayColor
      : numberInputRef.current === document.activeElement
        ? themeState.primaryColor
        : themeState.blackColor;

  const hasError = !!errors[name] || !!error;

  return (
    <div
      className={`field-input ${
        disabled ? "field-input--disabled" : ""
      } ${hasError ? "field-input--error" : ""}`}
    >
      <label className="field-input__label" htmlFor={name}>
        {label}

        {required && <span className="field-input__required">*</span>}

        {info && (
          <IconTooltip
            name="Info"
            weight="regular"
            color="Black"
            size={16}
            content={info}
            interactive={interactive}
            className="tool"
            popoverColor="black"
          >
            {tooltipChildren}
          </IconTooltip>
        )}
      </label>

      <div
        className={`field-input__wrapper ${
          errors?.[name] ? "field-input__wrapper--error" : ""
        }`}
      >
        {svg && <Icon name={svg} size={16} color={iconColor} />}

        <input
          id={name}
          type="number"
          disabled={disabled}
          placeholder={placeholder}
          readOnly={readOnly}
          defaultValue={defaultValue}
          min={min}
          max={max}
          step={step}
          ref={(element) => {
            ref(element);
            numberInputRef.current = element;
          }}
          {...rest}
        />
      </div>

      {errors?.[name] && (
        <ErrorMessage>{errors[name]?.message?.toString()}</ErrorMessage>
      )}
    </div>
  );
};

import { useRef, type JSX } from "react";
import { useFormContext, type RegisterOptions } from "react-hook-form";
import { ErrorMessage } from "../fields-styled/Fields.styled";
import "./EmailInput.scss";
import * as PhosphorIcons from "phosphor-react";
import { Icon } from "../../Icons/Icon";
import { useTheme } from "@/hooks";
import { IconTooltip } from "@/shared/Tooltip/IconTooltip/IconTooltip";

interface EmailInputProps {
  name: string;
  label: string;
  info?: string;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  readOnly?: boolean;
  defaultValue?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  validate?: RegisterOptions["validate"];
  required?: boolean | string;
  error?: string;
  svg?: keyof typeof PhosphorIcons;
  interactive?: boolean;
  tooltipChildren?: React.ReactNode;
}

export const EmailInput = ({
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
  svg,
  error,
  interactive,
  tooltipChildren,
}: EmailInputProps): JSX.Element => {
  const { themeState } = useTheme();

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const emailInputRef = useRef<HTMLInputElement | null>(null);

  const { ref, ...rest } = register(name, {
    required,
    validate: (value, formValues) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(value)) {
        return "Please enter a valid email address";
      }

      if (typeof validate === "function") {
        return validate(value, formValues);
      }

      return true;
    },
    onChange,
    onBlur,
  });

  const iconColor = errors[name]
    ? themeState.errorColor
    : disabled
      ? themeState.grayColor
      : emailInputRef.current === document.activeElement
        ? themeState.primaryColor
        : themeState.blackColor;

  const hasError = !!errors[name] || !!error;

  return (
    <div
      className={`email-input ${
        disabled ? "email-input--disabled" : ""
      } ${hasError ? "email-input--error" : ""}`}
    >
      <label className="email-input__label" htmlFor={name}>
        {label}

        {required && <span className="email-input__required">*</span>}

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
        className={`email-input__wrapper ${
          errors?.[name] ? "email-input__wrapper--error" : ""
        }`}
      >
        {svg && <Icon name={svg} size={16} color={iconColor} />}

        <input
          id={name}
          type="email"
          disabled={disabled}
          placeholder={placeholder}
          readOnly={readOnly}
          defaultValue={defaultValue}
          ref={(element) => {
            ref(element);
            emailInputRef.current = element;
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

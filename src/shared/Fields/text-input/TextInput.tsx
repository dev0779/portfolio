import { useRef, useState, type JSX } from "react";
import { useFormContext, type RegisterOptions } from "react-hook-form";
import { ErrorMessage } from "../fields-styled/Fields.styled";
import "./TextInput.scss";

import * as PhosphorIcons from "phosphor-react";
import { Icon } from "../../Icons/Icon";
import { useTheme } from "@/hooks";

interface TextInputProps {
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  readOnly?: boolean;
  defaultValue?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  validate?: RegisterOptions["validate"];
  required?: boolean | string;
  type?: string;
  error?: string;
  svg?: keyof typeof PhosphorIcons;
}

export const TextInput = ({
  name,
  required,
  label,
  placeholder,
  validate,
  onChange,
  onBlur,
  disabled,
  readOnly,
  defaultValue,
  type,
  svg,
  error,
}: TextInputProps): JSX.Element => {
  const { themeState } = useTheme();

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const textInputRef = useRef<HTMLInputElement | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { ref, ...rest } = register(name, {
    required,
    validate,
    onChange,
    onBlur,
  });

  const iconColor = errors[name]
    ? themeState.errorColor
    : disabled
      ? themeState.grayColor
      : textInputRef.current === document.activeElement
        ? themeState.primaryColor
        : themeState.blackColor;

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;
  const hasError = !!errors[name] || !!error;

  return (
    <div
      className={`text-input ${disabled ? "text-input--disabled" : ""} ${hasError ? "text-input--error" : ""}`}
    >
      <label className="text-input__label" htmlFor={name}>
        {required ? `${label} * ` : label}
      </label>
      <div
        className={`text-input__wrapper  ${errors?.[name] ? "text-input__wrapper--error" : ""}`}
      >
        {type !== "password" && svg && (
          <Icon name={svg || "User"} size={16} color={iconColor} />
        )}
        <input
          id={name}
          type={inputType}
          disabled={disabled}
          placeholder={placeholder}
          readOnly={readOnly}
          defaultValue={defaultValue}
          ref={(e) => {
            ref(e);
            textInputRef.current = e;
          }}
          {...rest}
        />
        {type === "password" && (
          <div
            onClick={
              isPassword ? () => setShowPassword(!showPassword) : undefined
            }
          >
            <Icon
              name={showPassword ? "Eye" : "EyeSlash"}
              size={18}
              color={iconColor}
            />
          </div>
        )}
      </div>
      {errors?.[name] && (
        <ErrorMessage>{errors[name]?.message?.toString()}</ErrorMessage>
      )}
    </div>
  );
};

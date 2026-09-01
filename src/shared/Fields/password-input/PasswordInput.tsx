import { useRef, useState, type JSX } from "react";
import { useFormContext, type RegisterOptions } from "react-hook-form";
import { ErrorMessage } from "../fields-styled/Fields.styled";
import "./PasswordInput.scss";
import * as PhosphorIcons from "phosphor-react";
import { Icon } from "../../Icons/Icon";
import { useTheme } from "@/hooks";
import { IconTooltip } from "@/shared/Tooltip/IconTooltip/IconTooltip";

interface PasswordInputProps {
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

export const PasswordInput = ({
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
  error,
  svg,
  interactive,
  tooltipChildren,
}: PasswordInputProps): JSX.Element => {
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

  const hasError = !!errors[name] || !!error;

  return (
    <div
      className={`text-input ${disabled ? "text-input--disabled" : ""} ${hasError ? "text-input--error" : ""}`}
    >
      <label className="text-input__label" htmlFor={name}>
        {required ? `${label} * ` : label}
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
        className={`text-input__wrapper  ${errors?.[name] ? "text-input__wrapper--error" : ""}`}
      >
        {svg && <Icon name={svg || "Key"} size={16} color={iconColor} />}
        <input
          id={name}
          type={showPassword ? "text" : "password"}
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

        <div onClick={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? "Eye" : "EyeSlash"}
            size={18}
            color={iconColor}
          />
        </div>
      </div>
      {errors?.[name] && (
        <ErrorMessage>{errors[name]?.message.toString()}</ErrorMessage>
      )}
    </div>
  );
};

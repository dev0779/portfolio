import { useRef, useState, type JSX } from "react";
import { useFormContext, type RegisterOptions } from "react-hook-form";
import { ErrorMessage } from "../fields-styled/Fields.styled";
import "./PasswordInput.scss";
import { Icon } from "../../Icons/Icon";
import { useTheme } from "@/hooks";
import Tippy from "@tippyjs/react";

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
          <Tippy content={info}>
            <span className="text-input__info">
              <Icon name="Info" color="blue" weight="fill" size={16} />
            </span>
          </Tippy>
        )}
      </label>
      <div
        className={`text-input__wrapper  ${errors?.[name] ? "text-input__wrapper--error" : ""}`}
      >
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
        <span className="text-input__error">{errors[name]?.message.toString()}</span>
      )}
    </div>
  );
};

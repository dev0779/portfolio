import { useRef, type JSX } from "react";
import { useFormContext, type RegisterOptions } from "react-hook-form";
import { ErrorMessage } from "../fields-styled/Fields.styled";
import "./NumberInput.scss";
import * as PhosphorIcons from "phosphor-react";
import { Icon } from "../../Icons/Icon";
import { useTheme } from "@/hooks";
import Tippy from "@tippyjs/react";

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
}: NumberInputProps): JSX.Element => {
  const { themeState } = useTheme();

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const numberInputRef = useRef<HTMLInputElement | null>(null);

  const { ref, ...rest } = register(name, {
    required,
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
      className={`number-input ${
        disabled ? "number-input--disabled" : ""
      } ${hasError ? "number-input--error" : ""}`}
    >
      <label className="number-input__label" htmlFor={name}>
        {label}

        {required && <span className="number-input__required">*</span>}

        {info && (
          <Tippy content={info}>
            <span className="number-input__info">
              <Icon name="Info" color="blue" weight="fill" size={16} />
            </span>
          </Tippy>
        )}
      </label>

      <div
        className={`number-input__wrapper ${
          errors?.[name] ? "number-input__wrapper--error" : ""
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

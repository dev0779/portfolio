import { useRef, type JSX } from "react";

import {
  useFormContext,
  type RegisterOptions,
} from "react-hook-form";

import { ErrorMessage } from "../fields-styled/Fields.styled";
import { Icon } from "../../Icons/Icon";
import { useTheme } from "@/hooks";
import Tippy from "@tippyjs/react";
import * as PhosphorIcons from "phosphor-react";
import "./TextareaInput.scss";

interface TextareaInputProps {
  name: string;
  label: string;
  info?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  defaultValue?: string;
  required?: boolean | string;
  validate?: RegisterOptions["validate"];
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
  rows?: number;
  height?: string;
  maxLength?: number;
  minLength?: number;
  error?: string;
  svg?: keyof typeof PhosphorIcons;
}

export const TextareaInput = ({
  name,
  label,
  info,
  placeholder,
  disabled,
  readOnly,
  defaultValue,
  required,
  validate,
  onChange,
  onBlur,
  rows = 5,
  height,
  maxLength,
  minLength,
  error,
  svg,
}: TextareaInputProps): JSX.Element => {
  const { themeState } = useTheme();

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { ref, ...rest } = register(name, {
    required,
    validate,
    onChange,
    onBlur,
  });

  const hasError = !!errors[name] || !!error;

  const iconColor = errors[name]
    ? themeState.errorColor
    : disabled
      ? themeState.grayColor
      : textareaRef.current === document.activeElement
        ? themeState.primaryColor
        : themeState.blackColor;

  return (
    <div
      className={`textarea-input ${
        disabled ? "textarea-input--disabled" : ""
      } ${
        hasError ? "textarea-input--error" : ""
      }`}
    >
      <label
        className="textarea-input__label"
        htmlFor={name}
      >
        {required ? `${label} *` : label}

        {info && (
          <Tippy content={info}>
            <span className="textarea-input__info">
              <Icon
                name="Info"
                color="blue"
                weight="fill"
                size={16}
              />
            </span>
          </Tippy>
        )}
      </label>

      <div className="textarea-input__wrapper">
        {svg && (
          <Icon
            name={svg}
            size={16}
            color={iconColor}
          />
        )}

        <textarea
          id={name}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
          defaultValue={defaultValue}
          rows={rows}
          maxLength={maxLength}
          minLength={minLength}
          style={{
            height,
          }}
          {...rest}
          ref={(element) => {
            ref(element);
            textareaRef.current = element;
          }}
        />
      </div>

      {hasError && (
        <ErrorMessage color={themeState.errorColor}>
          {errors[name]?.message?.toString() || error}
        </ErrorMessage>
      )}
    </div>
  );
};
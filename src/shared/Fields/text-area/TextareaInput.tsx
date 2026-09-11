import { useRef, type JSX } from "react";

import { useFormContext, type RegisterOptions } from "react-hook-form";

import { ErrorMessage } from "../fields-styled/Fields.styled";
import { Icon } from "../../Icons/Icon";
import { useTheme } from "@/hooks";
import * as PhosphorIcons from "phosphor-react";

import { IconTooltip } from "@/shared/Tooltip/IconTooltip/IconTooltip";

import "./../Fields.scss";
import { requiredErrorMessage } from "@/utils/errors";
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
  interactive?: boolean;
  tooltipChildren?: React.ReactNode;
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
  interactive,
  tooltipChildren,
}: TextareaInputProps): JSX.Element => {
  const { themeState } = useTheme();

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { ref, ...rest } = register(name, {
    required: required ? requiredErrorMessage : false,
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
      className={`field-input ${
        disabled ? "field-input--disabled" : ""
      } ${hasError ? "field-input--error" : ""}`}
    >
      <label className="field-input__label" htmlFor={name}>
        {required ? `${label} *` : label}
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

      <div className="field-input__wrapper">
        {svg && <Icon name={svg} size={16} color={iconColor} />}

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

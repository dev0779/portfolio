import { type JSX } from "react";

import { useFormContext, type RegisterOptions } from "react-hook-form";

import { ErrorMessage } from "../fields-styled/Fields.styled";

import * as PhosphorIcons from "phosphor-react";

import { IconTooltip } from "@/shared/Tooltip/IconTooltip/IconTooltip";
import { IconButton } from "@/shared/Buttons";

import "./../Fields.scss";
import "./NumberStepper.scss";

import { requiredErrorMessage } from "@/utils/errors";

interface NumberInputProps {
  name: string;
  label: string;
  info?: string;
  disabled?: boolean;
  defaultValue?: number;
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

export const NumberStepper = ({
  name,
  required,
  label,
  info,
  validate,
  disabled,
  min,
  max,
  step,
  error,
  interactive,
  tooltipChildren,
}: NumberInputProps): JSX.Element => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const value = watch(name) ?? min ?? 0;

  const handleMinus = () => {
    const nextValue = Math.max(
      min ?? 0,
      Number(value) - (step ?? 1),
    );

    setValue(name, nextValue, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handlePlus = () => {
    const nextValue = Math.min(
      max ?? Infinity,
      Number(value) + (step ?? 1),
    );

    setValue(name, nextValue, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const hasError = !!errors[name] || !!error;

  return (
    <div
      className={`field-input ${
        disabled ? "field-input--disabled" : ""
      } ${hasError ? "field-input--error" : ""}`}
    >
      <label className="field-input__label" htmlFor={name}>
        {label}

        {required && (
          <span className="field-input__required">*</span>
        )}

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
        className={`number-stepper__wrapper ${
          errors?.[name] ? "field-input__wrapper--error" : ""
        }`}
      >
        <IconButton
          type="button"
          variant="primary"
          size="s"
          icon="Minus"
          onClick={handleMinus}
          label="Remove"
          disabled={disabled || value <= (min ?? 0)}
        />

        <span
          id={name}
          className="number-stepper__value"
          aria-live="polite"
        >
          {value}
        </span>

        <IconButton
          type="button"
          variant="primary"
          size="s"
          icon="Plus"
          onClick={handlePlus}
          label="Add"
          disabled={disabled || value >= (max ?? Infinity)}
        />
      </div>

      {errors?.[name] && (
        <ErrorMessage>
          {errors[name]?.message?.toString()}
        </ErrorMessage>
      )}
    </div>
  );
};
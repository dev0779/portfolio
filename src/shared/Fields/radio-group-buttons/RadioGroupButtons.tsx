import {
  Controller,
  type FieldValues,
  type Path,
  useFormContext,
} from "react-hook-form";

import { Radio, type RadioValue } from "../radio-button/RadioButton";

import "./RadioGroupButtons.scss";
import Tippy from "@tippyjs/react";
import { Icon } from "@/shared/Icons/Icon";

export type RadioOption<T extends RadioValue = string> = {
  label: string;
  value: T;
  disabled?: boolean;
  info?: string;
};

type RadioButtonsProps<
  TFieldValues extends FieldValues,
  TValue extends RadioValue = string,
> = {
  name: Path<TFieldValues>;
  options: RadioOption<TValue>[];
    label?: string;
    info?: string;
  required?: boolean;
  disabled?: boolean;
  direction?: "row" | "column";
};

export const RadioGroupButtons = <
  TFieldValues extends FieldValues,
  TValue extends RadioValue = string,
>({
  name,
  options,
  label,
  info,
  required = false,
  disabled = false,
  direction = "row",
}: RadioButtonsProps<TFieldValues, TValue>) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ? "Please select an option" : false,
      }}
      render={({ field, fieldState }) => (
        <div
          className={`radio ${fieldState.error ? "radio--error" : ""} ${
            disabled ? "radio--disabled" : ""
          }`}
        >
          {label && (
            <div className="radio__label">
              {label}

              {required && <span className="radio__required">*</span>}
              {info && (
                <Tippy content={info}>
                  <span className="radio__info">
                    <Icon name="Info" color="blue" weight="fill" size={16} />
                  </span>
                </Tippy>
              )}
            </div>
          )}

          <div className="radio__wrapper">
              <div className={`radio__group radio__group--${direction}`}>
                {options.map((option) => (
                  <Radio
                    key={String(option.value)}
                    name={field.name}
                    label={option.label}
                    value={option.value}
                    checked={field.value === option.value}
                    onChange={field.onChange}
                    disabled={disabled || option.disabled}
                    error={!!fieldState.error}
                    info={option.info}
                  />
                ))}
              </div>
          </div>

          {fieldState.error && (
            <span className="radio__error">{fieldState.error.message}</span>
          )}
        </div>
      )}
    />
  );
};

import {
  Controller,
  type FieldValues,
  type Path,
  useFormContext,
} from "react-hook-form";

import { Radio, type RadioValue } from "../radio-button/RadioButton";
import { ErrorMessage } from "../fields-styled/Fields.styled";
import { IconTooltip } from "@/shared/Tooltip/IconTooltip/IconTooltip";

import './../Fields.scss';
import { requiredErrorMessage } from "@/utils/errors";

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
  onChange?: (value: TValue) => void;
  onBlur?: (value: TValue | "") => void;
  interactive?: boolean;
  tooltipChildren?: React.ReactNode;
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
  onChange,
  onBlur,
  interactive,
  tooltipChildren,
}: RadioButtonsProps<TFieldValues, TValue>) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ? requiredErrorMessage : false,
      }}
      render={({ field, fieldState }) => (
        <div
          className={`field-input ${fieldState.error ? "field-input--error" : ""} ${
            disabled ? "field-input--disabled" : ""
          }`}
        >
          {label && (
            <div className="field-input__label">
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
            </div>
          )}

          <div className="field-input__radiowrapper">
            <div className={`field-input__group field-input__group--${direction}`}>
              {options.map((option) => (
                <Radio
                  key={String(option.value)}
                  name={field.name}
                  label={option.label}
                  value={option.value}
                  checked={field.value === option.value}
                  onChange={(value) => {
                    field.onChange(value);
                    onChange?.(value);
                  }}
                  disabled={disabled || option.disabled}
                  error={!!fieldState.error}
                  info={option.info}
                  onBlur={() => {
                    field.onBlur();
                    onBlur?.(field.value ?? "");
                  }}
                />
              ))}
            </div>
          </div>

          {fieldState.error && (
            <ErrorMessage>{fieldState.error.message}</ErrorMessage>
          )}
        </div>
      )}
    />
  );
};

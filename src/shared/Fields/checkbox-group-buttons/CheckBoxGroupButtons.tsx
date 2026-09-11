import {
  Controller,
  type FieldValues,
  type Path,
  useFormContext,
} from "react-hook-form";

import { Checkbox } from "../checkbox/Checkbox";
import { ErrorMessage } from "../fields-styled/Fields.styled";
import { IconTooltip } from "@/shared/Tooltip/IconTooltip/IconTooltip";

import "./../Fields.scss";
import { requiredErrorMessage } from "@/utils/errors";

export type CheckboxGroupValue = string | number;

export type CheckboxGroupOption<TValue extends CheckboxGroupValue = string> = {
  label: string;
  value: TValue;
  disabled?: boolean;
  info?: string;
  interactive?: boolean;
  tooltipChildren?: React.ReactNode;
};

type CheckboxGroupProps<
  TFieldValues extends FieldValues,
  TValue extends CheckboxGroupValue = string,
> = {
  name: Path<TFieldValues>;
  options: CheckboxGroupOption<TValue>[];
  label?: string;
  info?: string;
  required?: boolean;
  disabled?: boolean;
  direction?: "row" | "column";
  onChange?: (values: TValue[]) => void;
  onBlur?: (values: TValue[]) => void;
  interactive?: boolean;
  tooltipChildren?: React.ReactElement;
};

export const CheckboxGroup = <
  TFieldValues extends FieldValues,
  TValue extends CheckboxGroupValue = string,
>({
  name,
  options,
  label,
  info,
  required = false,
  disabled = false,
  direction = "column",
  onChange,
  onBlur,
  interactive,
  tooltipChildren,
}: CheckboxGroupProps<TFieldValues, TValue>) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        validate: required
          ? (values) =>
              values?.length > 0 || requiredErrorMessage
          : undefined,
      }}
      render={({ field, fieldState }) => {
        const selectedValues = (field.value ?? []) as TValue[];

        const handleChange = (value: TValue, checked: boolean) => {
          const newValues = checked
            ? [...selectedValues, value]
            : selectedValues.filter((selectedValue) => selectedValue !== value);

          field.onChange(newValues);
          onChange?.(newValues);
        };

        return (
          <div
            className={`field-input ${
              fieldState.error ? "field-input--error" : ""
            } ${disabled ? "field-input--disabled" : ""}`}
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
              <div
                className={`field-input__group field-input__group--${direction}`}
              >
                {options.map((option) => {
                  const isChecked = selectedValues.includes(option.value);

                  return (
                    <Checkbox
                      key={String(option.value)}
                      name={`${name}-${String(option.value)}`}
                      label={option.label}
                      checked={isChecked}
                      disabled={disabled || option.disabled}
                      info={option.info}
                      onChange={(checked) => {
                        handleChange(option.value, checked);
                      }}
                      onBlur={() => {
                        field.onBlur();
                        onBlur?.(selectedValues);
                      }}
                    />
                  );
                })}
              </div>
            </div>
            {fieldState.error && (
              <ErrorMessage>{fieldState.error.message}</ErrorMessage>
            )}
          </div>
        );
      }}
    />
  );
};

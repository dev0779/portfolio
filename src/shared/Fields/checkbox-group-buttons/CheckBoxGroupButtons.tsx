import {
  Controller,
  type FieldValues,
  type Path,
  useFormContext,
} from "react-hook-form";

import { Checkbox } from "../checkbox/Checkbox";
import "./CheckBoxGroupButtons.scss";
import { ErrorMessage } from "../fields-styled/Fields.styled";
import { IconTooltip } from "@/shared/Tooltip/icon-tooltip/IconTooltip";

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
              values?.length > 0 || "Please select at least one option"
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
            className={`checkbox-group ${
              fieldState.error ? "checkbox-group--error" : ""
            } ${disabled ? "checkbox-group--disabled" : ""}`}
          >
            {label && (
              <div className="checkbox-group__label">
                {label}

                {required && (
                  <span className="checkbox-group__required">*</span>
                )}

                {info && (
                  <IconTooltip
                    name="Info"
                    weight="regular"
                    color="Black"
                    size={16}
                    tooltip={info}
                    interactive={interactive}
                    className="tool"
                    popoverColor="black"
                  >
                    {tooltipChildren}
                  </IconTooltip>
                )}
              </div>
            )}

            <div
              className={`checkbox-group__wrapper checkbox-group__wrapper--${direction}`}
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

            {fieldState.error && (
              <ErrorMessage>{fieldState.error.message}</ErrorMessage>
            )}
          </div>
        );
      }}
    />
  );
};

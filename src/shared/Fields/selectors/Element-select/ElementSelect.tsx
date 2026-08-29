import {
  Controller,
  type FieldValues,
  type Path,
  useFormContext,
} from "react-hook-form";

import Tippy from "@tippyjs/react";

import "./Select.scss";
import { Icon } from "@/shared/Icons/Icon";
import { ErrorMessage } from "./../../fields-styled/Fields.styled";

export type SelectValue = string | number;

export type SelectOption<TValue extends SelectValue = string> = {
  label: string;
  value: TValue;
  disabled?: boolean;
};

type SelectProps<
  TFieldValues extends FieldValues,
  TValue extends SelectValue = string,
> = {
  name: Path<TFieldValues>;
  options: SelectOption<TValue>[];
  label?: string;
  info?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  clearable?: boolean;

  onChange?: (value: TValue | "") => void;
  onBlur?: (value: TValue | "") => void;
};

export const ElementSelect = <
  TFieldValues extends FieldValues,
  TValue extends SelectValue = string,
>({
  name,
  options,
  label,
  info,
  placeholder = "Select an option",
  required = false,
  disabled = false,
  clearable = false,
  onChange,
  onBlur,
}: SelectProps<TFieldValues, TValue>) => {
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
          className={`select ${fieldState.error ? "select--error" : ""} ${
            disabled ? "select--disabled" : ""
          }`}
        >
          {label && (
            <div className="select__label">
              {label}
              {required && <span className="select__required">*</span>}
              {info && (
                <Tippy content={info}>
                  <span className="select__info">
                    <Icon name="Info" color="blue" weight="fill" size={16} />
                  </span>
                </Tippy>
              )}
            </div>
          )}

          <div className="select__wrapper">
            <select
              name={field.name}
              ref={field.ref}
              disabled={disabled}
              value={field.value ?? ""}
              onBlur={field.onBlur}
              onChange={(event) => {
                const selectedOption = options.find(
                  (option) => String(option.value) === event.target.value,
                );

                const value = selectedOption?.value ?? "";
                field.onChange(value);
                field.onChange(value);
                onChange?.(value);
                onBlur?.(value);
              }}
            >
              <option value="" disabled={!clearable}>
                {placeholder}
              </option>

              {options.map((option) => (
                <option
                  key={String(option.value)}
                  value={String(option.value)}
                  disabled={option.disabled}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {fieldState.error && (
            <ErrorMessage>{fieldState.error.message}</ErrorMessage>
          )}
        </div>
      )}
    />
  );
};

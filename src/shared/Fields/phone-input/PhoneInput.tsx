import type { JSX } from "react";
import { Controller, useFormContext } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import type { CountryCode } from "libphonenumber-js/core";
import "react-phone-number-input/style.css";

import Tippy from "@tippyjs/react";

import { Icon } from "@/shared/Icons/Icon";
import { ErrorMessage } from "../fields-styled/Fields.styled";
import { useTheme } from "@/hooks/useTheme";

import "./PhoneInput.scss";

interface PhoneInputProps {
  name: string;
  label: string;
  info?: string;
  required?: boolean;
  defaultCountry?: CountryCode;
  disabled?: boolean;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
}

export const PhoneNumberInput = ({
  name,
  label,
  info,
  required,
  defaultCountry = "PT",
  disabled,
  onChange,
  onBlur,
}: PhoneInputProps): JSX.Element => {
  const { control } = useFormContext();
  const { themeState } = useTheme();

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ? "This field is required" : false,
      }}
      render={({ field, fieldState }) => (
        <div
          className={`phone-input ${
            fieldState.error ? "phone-input--error" : ""
          } ${disabled ? "phone-input--disabled" : ""}`}
        >
          <label className="phone-input__label" htmlFor={name}>
            {required ? `${label} *` : label}

            {info && (
              <Tippy content={info}>
                <span className="phone-input__info">
                  <Icon name="Info" color="blue" weight="fill" size={16} />
                </span>
              </Tippy>
            )}
          </label>

          <div className="phone-input__wrapper">
            <PhoneInput
              id={name}
              name={field.name}
              value={field.value || ""}
              onChange={(value) => {
                const phone = value || "";
                field.onChange(phone);
                onChange?.(phone);
              }}
              onBlur={field.onBlur}
              defaultCountry={defaultCountry}
              disabled={disabled}
            />
          </div>

          {fieldState.error && (
            <ErrorMessage color={themeState.errorColor}>
              {fieldState.error.message}
            </ErrorMessage>
          )}
        </div>
      )}
    />
  );
};

import type { JSX } from "react";
import { Controller, useFormContext } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import type { CountryCode } from "libphonenumber-js/core";
import "react-phone-number-input/style.css";
import * as PhosphorIcons from "phosphor-react";
import { Icon } from "@/shared/Icons/Icon";
import { ErrorMessage } from "../fields-styled/Fields.styled";
import { useTheme } from "@/hooks/useTheme";

import "./PhoneInput.scss";
import { IconTooltip } from "@/shared/Tooltip/IconTooltip/IconTooltip";

interface PhoneInputProps {
  name: string;
  label: string;
  info?: string;
  required?: boolean;
  defaultCountry?: CountryCode;
  disabled?: boolean;
  interactive?: boolean;
  tooltipChildren?: React.ReactNode;
  svg?: keyof typeof PhosphorIcons;
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
  interactive,
  tooltipChildren,
  svg,
}: PhoneInputProps): JSX.Element => {
  const { control } = useFormContext();
  const { themeState } = useTheme();

  const iconColor = "black";
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

          <div className="phone-input__wrapper">
            {svg && <Icon name={svg || "User"} size={16} color={iconColor} />}
            <PhoneInput
              id={name}
              name={field.name}
              value={field.value || ""}
              onChange={(value) => {
                const phone = value || "";
                field.onChange(phone);
                onChange?.(phone);
                onBlur?.(phone);
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

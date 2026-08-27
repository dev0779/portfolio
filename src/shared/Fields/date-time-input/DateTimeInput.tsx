import { useState, type JSX } from "react";

import { Controller, useFormContext } from "react-hook-form";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import "./DateTimeInput.scss";
import Tippy from "@tippyjs/react";
import { Icon } from "@/shared/Icons/Icon";
import { ErrorMessage } from "../fields-styled/Fields.styled";
import { useTheme } from "@/hooks/useTheme";

interface DateTimeInputProps {
  name: string;
  label: string;
  info?: string;
  format?: string;
  required?: boolean;
  min?: Date;
  max?: Date;
}

// ! format = "dd-MM-yyyy HH:mm",
export const DateTimeInput = ({
  name,
  label,
  info,
  format = "dd-MM-yyyy",
  required,
  min,
  max,
}: DateTimeInputProps): JSX.Element => {
  const { control } = useFormContext();
  const { themeState } = useTheme();

  const [open, setOpen] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ? "This field is required" : false,
      }}
      render={({ field, fieldState }) => (
        <div className="date-input">
          <label className="date-input__label" htmlFor={name}>
            {required ? `${label} * ` : label}

            {info && (
              <Tippy content={info}>
                <span className="date-input__info">
                  <Icon name="Info" color="blue" weight="fill" size={16} />
                </span>
              </Tippy>
            )}
          </label>
          <div className="date-input__wrapper">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                format={format}
                views={["year", "month", "day"]}
                value={field.value ? new Date(field.value) : null}
                onChange={(value) => {
                  field.onChange(value);
                }}
                minDateTime={min}
                maxDateTime={max}
                slotProps={{
                  textField: {
                    className: "date-time-input__field",
                    required,
                    error: !!fieldState.error,
                    fullWidth: true,
                    onBlur: field.onBlur,

                    sx: {
                      "& .MuiPickersInputBase-root": {
                        padding: 0,
                        border: "none",
                        borderRadius: 0,
                        backgroundColor: "transparent",
                        outline: "none",
                        boxShadow: "none",
                      },

                      "& .MuiPickersOutlinedInput-root": {
                        padding: 0,
                        border: "none",
                        borderRadius: 0,
                        backgroundColor: "transparent",
                        outline: "none",
                        boxShadow: "none",
                      },

                      "& .MuiPickersOutlinedInput-notchedOutline": {
                        border: "none",
                      },

                      "& .MuiPickersInputBase-input": {
                        padding: "0",
                        fontSize: "12px",
                      },

                      "& .MuiIconButton-root": {
                        padding: "0",
                      },
                      "& .MuiPickersSectionList-root": {
                        padding: 0,
                      },
                      "& .MuiPickersInputBase-sectionContent": {
                        padding: 0,
                        fontSize: 12,
                      },
                    },
                  },
                }}
              />
            </LocalizationProvider>
          </div>
          {fieldState.error && (
            <ErrorMessage color={themeState.errorColor}>
              {fieldState.error.message}
            </ErrorMessage>
            /*        <span className="date-input__error">
                {fieldState.error.message}
              </span> */
          )}
        </div>
      )}
    />
  );
};

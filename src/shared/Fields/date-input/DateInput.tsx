import { useEffect, useRef, useState, type JSX } from "react";

import { Controller, useFormContext } from "react-hook-form";
import { format as formatDateDisplay } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import "./DateInput.scss";

import { Icon } from "../../Icons/Icon";
import { useTheme } from "@/hooks";
import Tippy from "@tippyjs/react";
import { ErrorMessage } from "../fields-styled/Fields.styled";

interface DateInputProps {
  name: string;
  label: string;
  info?: string;
  placeholder?: string;
  format?: string;
  required?: boolean;
  min?: Date;
  max?: Date;
  disabledDates?: {
    before?: Date;
    after?: Date;
    dayOfWeek?: number[];
  };
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
}

export const DateInput = ({
  name,
  label,
  info,
  placeholder,
  format = "dd-MM-yyyy",
  required,
  min = new Date(1950, 0),
  max = new Date(2030, 11),
  disabledDates,
  onChange,
  onBlur,
}: DateInputProps): JSX.Element => {
  const { control } = useFormContext();
  const { themeState } = useTheme();

  const [isOpen, setIsOpen] = useState(false);

  const formatDate = (date: Date) => {
    return [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join("-");
  };

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={({ field, fieldState }) => {
        const selectedDate = field.value
          ? new Date(`${field.value}T00:00:00`)
          : undefined;

        const displayValue = field.value
          ? formatDateDisplay(
              new Date(`${field.value}T00:00:00`),
              format ?? "dd-MM-yyyy",
            )
          : "";

        return (
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

            <div className="date-input__wrapper" ref={wrapperRef}>
              {/* DATE FIELD */}

              <input
                id={name}
                name={field.name}
                ref={field.ref}
                type="text"
                value={displayValue}
                placeholder={
                  placeholder ? placeholder : format ? format : "dd-MM-yyyy"
                }
                readOnly
                onBlur={field.onBlur}
                onClick={() => setIsOpen((current) => !current)}
              />
              <div
                className="date-input__calendar"
                onClick={() => setIsOpen((current) => !current)}
              >
                <Icon name="Calendar" size={18} color={themeState.blackColor} />
              </div>

              {/* DATE PICKER */}
              {isOpen && (
                <div className="date-input__picker">
                  <DayPicker
                    mode="single"
                    captionLayout="dropdown"
                    selected={selectedDate}
                    onSelect={(date) => {
                      if (!date) return;

                      const value = formatDate(date);
                      field.onChange(value);
                      onChange?.(value);
                      setIsOpen(false);
                    }}
                    startMonth={min}
                    endMonth={max}
                    disabled={[
                      ...(min ? [{ before: min }] : []),
                      ...(max ? [{ after: max }] : []),
                      ...(disabledDates?.dayOfWeek
                        ? [{ dayOfWeek: disabledDates.dayOfWeek }]
                        : []),
                    ]}
                  />
                </div>
              )}
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

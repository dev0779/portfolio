import React, { useEffect, useRef, useState } from "react";

import {
  Controller,
  useFormContext,
  useWatch,
  type FieldValues,
  type Path,
} from "react-hook-form";

import * as PhosphorIcons from "phosphor-react";

import { Icon } from "@/shared/Icons/Icon";
import { useTheme } from "@/hooks";
import { IconTooltip } from "@/shared/Tooltip/icon-tooltip/IconTooltip";

import "./Select.scss";

import { ErrorMessage } from "../../fields-styled/Fields.styled";
import { useSelectNavigation } from "@/hooks/useSelectNavigation";
import isEqual from "lodash/isEqual";
import { InputDropdown } from "../Dropdown/InputDropdown";

export type SelectValue = string | number | object;

export type SelectOption<TValue extends SelectValue = string> = {
  label: string;
  value: TValue;
  disabled?: boolean;
};

type SelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TValue extends SelectValue = string,
> = {
  name?: Path<TFieldValues>;
  options: SelectOption<TValue>[];
  value?: TValue;

  label?: string;
  info?: string;
  placeholder?: string;

  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;

  clearable?: boolean;

  svg?: keyof typeof PhosphorIcons;

  form?: boolean;

  interactive?: boolean;
  tooltipChildren?: React.ReactNode;

  loading?: boolean;

  onChange?: (value: TValue | undefined) => void;
  onBlur?: (value: TValue | undefined) => void;
};

export const Select = <
  TFieldValues extends FieldValues = FieldValues,
  TValue extends SelectValue = string,
>({
  name,
  options,
  value,

  label,
  info,
  placeholder = "Select an option",

  required = false,
  disabled = false,
  readOnly = false,

  clearable = false,

  svg,

  form = true,

  interactive,
  tooltipChildren,

  loading,

  onChange,
  onBlur,
}: SelectProps<TFieldValues, TValue>) => {
  const { themeState } = useTheme();

  const selectRef = useRef<HTMLDivElement | null>(null);

  const [open, setOpen] = useState(false);
  const [displayValue, setDisplayValue] = useState("");

  const [selectedOption, setSelectedOption] = useState<
    SelectOption<TValue> | undefined
  >();

  const {
    highlightedIndex,
    setHighlightedIndex,
    moveDown,
    moveUp,
    optionRefs,
  } = useSelectNavigation({
    options,
  });

  const formContext = useFormContext<TFieldValues>();

  const fieldValue = useWatch({
    control: formContext.control,
    name: name as Path<TFieldValues>,
  }) as TValue | undefined;

  const currentValue = form ? fieldValue : value;

  useEffect(() => {
    const currentOption = options.find((option) =>
      isEqual(option.value, currentValue),
    );

    setSelectedOption(currentOption);
    setDisplayValue(currentOption?.label ?? "");
  }, [currentValue, options]);

  const renderInput = (
    currentFieldValue: TValue | undefined,
    fieldOnChange: (value: TValue | undefined) => void,
    fieldOnBlur: () => void,
    error?: string,
  ) => {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) {
        return;
      }

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();

          if (!open) {
            setOpen(true);
          } else {
            moveDown();
          }

          break;

        case "ArrowUp":
          event.preventDefault();

          if (!open) {
            setOpen(true);
          } else {
            moveUp();
          }

          break;

        case "Enter":
          event.preventDefault();

          if (!open) {
            setOpen(true);
            return;
          }

          if (highlightedIndex >= 0) {
            const option = options[highlightedIndex];

            if (!option.disabled) {
              handleSelect(option);
            }
          }

          break;

        case "Escape":
          event.preventDefault();
          setOpen(false);
          break;

        default:
          if (event.key.length === 1) {
            findOptionByKey(event.key);
          }
      }
    };

    const handleSelect = (option: SelectOption<TValue>) => {
      if (option.disabled || readOnly) {
        return;
      }

      fieldOnChange(option.value);

      setDisplayValue(option.label);
      setSelectedOption(option);
      setOpen(false);
    };

    const findOptionByKey = (key: string) => {
      const index = options.findIndex((option) =>
        option.label.toLowerCase().startsWith(key.toLowerCase()),
      );

      if (index !== -1) {
        setHighlightedIndex(index);

        optionRefs.current[index]?.scrollIntoView({
          block: "nearest",
        });
      }
    };

    const iconColor = error
      ? themeState.errorColor
      : disabled
        ? themeState.grayColor
        : selectRef.current === document.activeElement
          ? themeState.primaryColor
          : themeState.blackColor;

    const listboxId = `${name ?? "select"}-listbox`;

    return (
      <div
        className={`select ${
          error ? "select--error" : ""
        } ${disabled ? "select--disabled" : ""}`}
      >
        {label && (
          <div className="select__label">
            {label}

            {required && <span className="select__required">*</span>}

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

        <InputDropdown
          open={open}
          onOpenChange={setOpen}
          trigger={
            <div
              ref={selectRef}
              className="select__wrapper"
              tabIndex={disabled ? -1 : 0}
              role="combobox"
              aria-expanded={open}
              aria-controls={listboxId}
              aria-activedescendant={
                highlightedIndex >= 0
                  ? `${listboxId}-option-${highlightedIndex}`
                  : undefined
              }
              onClick={() => {
                if (!disabled && !readOnly) {
                  setOpen(true);
                }
              }}
              onKeyDown={handleKeyDown}
            >
              {svg && <Icon name={svg} size={16} color={iconColor} />}

              <input
                id={name}
                name={name}
                type="text"
                value={displayValue}
                placeholder={placeholder}
                disabled={disabled}
                readOnly
                tabIndex={-1}
              />

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();

                  if (!disabled) {
                    setOpen((current) => !current);
                  }
                }}
                disabled={disabled}
                className="select__button"
                tabIndex={-1}
              >
                <Icon
                  name={open ? "CaretUp" : "CaretDown"}
                  size={16}
                  color={iconColor}
                />
              </button>
            </div>
          }
        >
          <div className="select__options" id={listboxId} role="listbox">
            {loading ? (
              <div className="select__loading">Loading...</div>
            ) : (
              <>
                {options.map((option, index) => {
                  const isSelected = isEqual(
                    selectedOption?.value,
                    option.value,
                  );

                  return (
                    <button
                      key={index}
                      id={`${listboxId}-option-${index}`}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      disabled={option.disabled}
                      className={`select__option ${
                        isSelected ? "select__selected" : ""
                      } ${
                        highlightedIndex === index ? "select__highlighted" : ""
                      }`}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        handleSelect(option);
                      }}
                      onMouseEnter={() => {
                        setHighlightedIndex(index);
                      }}
                      ref={(element) => {
                        optionRefs.current[index] = element;
                      }}
                    >
                      {isSelected && (
                        <Icon
                          name="Check"
                          color={
                            highlightedIndex === index
                              ? themeState.whiteColor
                              : themeState.blackColor
                          }
                          hoverColor={themeState.whiteColor}
                          weight="bold"
                          size={16}
                        />
                      )}

                      <span>{option.label}</span>
                    </button>
                  );
                })}

                {options.length === 0 && (
                  <ErrorMessage>No Results Found</ErrorMessage>
                )}
              </>
            )}
          </div>
        </InputDropdown>

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    );
  };

  if (!form) {
    return renderInput(
      value,
      (newValue) => onChange?.(newValue),
      () => onBlur?.(value),
    );
  }

  if (!name) {
    throw new Error("Select: 'name' is required when form=true.");
  }

  return (
    <Controller
      name={name}
      control={formContext.control}
      rules={{
        required: required ? "Please select an option" : false,
      }}
      render={({ field, fieldState }) =>
        renderInput(
          field.value,
          field.onChange,
          field.onBlur,
          fieldState.error?.message,
        )
      }
    />
  );
};

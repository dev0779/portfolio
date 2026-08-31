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

import "./SelectSearch.scss";

import { ErrorMessage } from "../../fields-styled/Fields.styled";
import { useSelectNavigation } from "@/hooks/useSelectNavigation";
import isEqual from "lodash/isEqual";

import { InputDropdown } from "../Dropdown/InputDropdown";

export type SelectSearchValue = string | number | object;

export type SelectSearchOption<TValue extends SelectSearchValue = string> = {
  label: string;
  value: TValue;
  disabled?: boolean;
};

type SelectSearchProps<
  TFieldValues extends FieldValues = FieldValues,
  TValue extends SelectSearchValue = string,
> = {
  name?: Path<TFieldValues>;
  options: SelectSearchOption<TValue>[];

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

export const OLDSelectSearch = <
  TFieldValues extends FieldValues = FieldValues,
  TValue extends SelectSearchValue = string,
>({
  name,
  options,
  value,
  label,
  info,
  placeholder = "Search...",
  required = false,
  disabled = false,
  readOnly = false,
  svg,
  form = true,
  onChange,
  onBlur,
  interactive,
  tooltipChildren,
  loading,
}: SelectSearchProps<TFieldValues, TValue>) => {
  const { themeState } = useTheme();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [open, setOpen] = useState(false);

  const [filteredOptions, setFilteredOptions] =
    useState<SelectSearchOption<TValue>[]>(options);

  const [searchValue, setSearchValue] = useState<string>("");

  const [selectedOption, setSelectedOption] = useState<
    SelectSearchOption<TValue> | undefined
  >();

  const {
    highlightedIndex,
    setHighlightedIndex,
    moveDown,
    moveUp,
    optionRefs,
  } = useSelectNavigation({ options: filteredOptions });

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
    setSearchValue(currentOption?.label ?? "");
  }, [currentValue, options]);

  const renderInput = (
    currentFieldValue: TValue | undefined,
    fieldOnChange: (value: TValue | undefined) => void,
    fieldOnBlur: () => void,
    error?: string,
  ) => {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled || readOnly) return;

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          moveDown();
          break;
        case "ArrowUp":
          event.preventDefault();
          moveUp();
          break;
        case "Escape":
          event.preventDefault();
          setOpen(false);
          break;
        case "Enter":
          event.preventDefault();
          if (highlightedIndex >= 0) {
            const option = filteredOptions[highlightedIndex];
            if (!option.disabled) {
              handleSelect(option);
            }
          }
      }
    };

    const handleOptions = (searchValue: string) => {
      const findOptions = options.filter((option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase()),
      );

      setFilteredOptions(findOptions);
    };

    const handleSelect = (option: SelectSearchOption<TValue>) => {
      if (option.disabled) return;

      fieldOnChange(option.value);

      setSearchValue(option.label);
      setSelectedOption(option);
      setFilteredOptions(options);
      setOpen(false);
    };

    const handleClear = () => {
      fieldOnChange(undefined);
      setSearchValue("");
      setSelectedOption(undefined);
      setFilteredOptions(options);
    };

    const clearOptions = () => {
      setFilteredOptions(options);
    };

    const iconColor = error
      ? themeState.errorColor
      : disabled
        ? themeState.grayColor
        : inputRef.current === document.activeElement
          ? themeState.primaryColor
          : themeState.blackColor;

    const listboxId = `${name ?? "select-search"}-listbox`;

    return (
      <div
        className={`select-search ${
          error ? "select-search--error" : ""
        } ${disabled ? "select-search--disabled" : ""}`}
      >
        {label && (
          <div className="select-search__label">
            {label}

            {required && <span className="select-search__required">*</span>}

            {info && (
              <>
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
              </>
            )}
          </div>
        )}

        <InputDropdown
          open={open}
          onOpenChange={(event) => {
            setOpen(event);
            clearOptions();
          }}
          trigger={
            <div
              className="select-search__wrapper"
              onClick={() => setOpen(true)}
            >
              {svg && <Icon name={svg} size={16} color={iconColor} />}

              <input
                id={name}
                name={name}
                type="text"
                value={searchValue}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                ref={(element) => {
                  inputRef.current = element;
                }}
                onFocus={() => {
                  if (!disabled && !readOnly) {
                    setOpen(true);
                  }
                }}
                onBlur={() => {
                  fieldOnBlur();
                  onBlur?.(currentFieldValue);
                }}
                onChange={(e) => {
                  const value = e.target.value;

                  setSearchValue(value);
                  handleOptions(value);
                }}
                onKeyDown={handleKeyDown}
                role="combobox"
                aria-expanded={open}
                aria-controls={listboxId}
                aria-autocomplete="list"
                aria-activedescendant={
                  highlightedIndex >= 0
                    ? `${listboxId}-option-${highlightedIndex}`
                    : undefined
                }
              />

              {currentFieldValue !== undefined && (
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleClear();
                  }}
                  disabled={disabled}
                  className="select-search__button"
                >
                  <Icon name="X" size={16} color={iconColor} />
                </button>
              )}
              {!open && (
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  disabled={disabled}
                  className="select-search__button"
                >
                  <Icon name="CaretDown" size={16} color={iconColor} />
                </button>
              )}

              {open && (
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  disabled={disabled}
                  className="select-search__button"
                >
                  <Icon name="CaretUp" size={16} color={iconColor} />
                </button>
              )}
            </div>
          }
        >
          <div className="select-search__options" id={listboxId} role="listbox">
            {filteredOptions.map((option, index) => {
              const isSelected = isEqual(selectedOption?.value, option.value);
              return (
                <button
                  className={`select-search__option ${
                    isSelected ? "select-search__selected" : ""
                  }
                  ${
                    highlightedIndex === index
                      ? "select-search__highlighted"
                      : ""
                  }`}
                  id={`${listboxId}-option-${index}`}
                  key={index}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  disabled={option.disabled}
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
                      className="select-search__selected"
                    />
                  )}
                  <span>{option.label}</span>
                </button>
              );
            })}
            {filteredOptions.length === 0 && (
              <ErrorMessage>No Results Found</ErrorMessage>
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

  return (
    <Controller
      name={name!}
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

import React, { useEffect, useRef, useState } from "react";

import {
  Controller,
  useFormContext,
  useWatch,
  type FieldValues,
  type Path,
} from "react-hook-form";

import Tippy from "@tippyjs/react";
import * as PhosphorIcons from "phosphor-react";

import { Icon } from "@/shared/Icons/Icon";
import { useTheme } from "@/hooks";

import { InputDropdown } from "../Dropdown/InputDropdown";

import "./SelectSearch.scss";

import { ErrorMessage } from "../../fields-styled/Fields.styled";
import { useSelectNavigation } from "@/hooks/useSelectNavigation";

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

  onChange?: (value: TValue | undefined) => void;
  onBlur?: (value: TValue | undefined) => void;
};

export const SelectSearch = <
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
  clearable = false,
  svg,
  form = true,
  onChange,
  onBlur,
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
    const currentOption = options.find(
      (option) => option.value === currentValue,
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
      if (!clearable) return;

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
              <Tippy content={info}>
                <span className="select-search__info">
                  <Icon name="Info" color="blue" weight="fill" size={16} />
                </span>
              </Tippy>
            )}
          </div>
        )}

        <div className="select-search__wrapper" onClick={() => setOpen(true)}>
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
          />

          {currentFieldValue !== undefined && (
            <button type="button" onClick={handleClear} disabled={disabled}>
              <Icon name="X" size={16} color={iconColor} />
            </button>
          )}
          {!open && (
            <button
              type="button"
              onClick={() => setOpen(true)}
              disabled={disabled}
            >
              <Icon name="CaretDown" size={16} color={iconColor} />
            </button>
          )}

          {open && (
            <button
              type="button"
              onClick={() => setOpen(true)}
              disabled={disabled}
            >
              <Icon name="CaretUp" size={16} color={iconColor} />
            </button>
          )}
        </div>

        <InputDropdown
          open={open}
          onOpenChange={(event) => {
            setOpen(event);
            clearOptions();
          }}
        >
          <div className="select-search__options">
            {filteredOptions.map((option, index) => (
              <button
                className={`select-search__option ${
                  selectedOption?.label === option.label
                    ? "select-search__selected"
                    : ""
                }
                  ${
                    highlightedIndex === index
                      ? "select-search__highlighted"
                      : ""
                  }`}
                key={String(option.value)}
                type="button"
                disabled={option.disabled}
                onMouseDown={(event) => {
                  event.preventDefault();
                  handleSelect(option);
                }}
              >
                {selectedOption?.label === option.label && (
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
            ))}
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

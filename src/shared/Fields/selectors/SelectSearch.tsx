import React, { useEffect, useRef, useState } from "react";

import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form";

import * as PhosphorIcons from "phosphor-react";
import isEqual from "lodash/isEqual";

import { Icon } from "@/shared/Icons/Icon";
import { useTheme } from "@/hooks";
import { IconTooltip } from "@/shared/Tooltip/IconTooltip/IconTooltip";

import { ErrorMessage } from "../fields-styled/Fields.styled";
import { useSelectNavigation } from "@/hooks/useSelectNavigation";
import { InputDropdown } from "./Dropdown/InputDropdown";
import { requiredErrorMessage } from "@/utils/errors";
import { Loader } from "@/shared/Loader/Loader";


import "./GlobalSelect.scss";
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
  name: Path<TFieldValues>;
  options: SelectSearchOption<TValue>[];
  label?: string;
  info?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  svg?: keyof typeof PhosphorIcons;
  interactive?: boolean;
  tooltipChildren?: React.ReactNode;
  onChange?: (value: TValue | undefined) => void;
  onBlur?: (value: TValue | undefined) => void;
  loading?: boolean;
  apiError?: string;
};

type SelectSearchFieldProps<
  TFieldValues extends FieldValues,
  TValue extends SelectSearchValue,
> = SelectSearchProps<TFieldValues, TValue> & {
  field: {
    value: TValue | undefined;
    onChange: (value: TValue | undefined) => void;
    onBlur: () => void;
  };
  error?: string;
};

const SelectSearchField = <
  TFieldValues extends FieldValues,
  TValue extends SelectSearchValue,
>({
  name,
  options,
  label,
  info,
  placeholder = "Search...",
  required = false,
  disabled = false,
  readOnly = false,
  svg,
  interactive,
  tooltipChildren,
  onChange,
  onBlur,
  field,
  error,
  loading,
  apiError,
}: SelectSearchFieldProps<TFieldValues, TValue>) => {
  const { themeState } = useTheme();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [open, setOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const [filteredOptions, setFilteredOptions] =
    useState<SelectSearchOption<TValue>[]>(options);

  const [searchValue, setSearchValue] = useState("");

  const [selectedOption, setSelectedOption] = useState<
    SelectSearchOption<TValue> | undefined
  >();

  const {
    highlightedIndex,
    setHighlightedIndex,
    moveDown,
    moveUp,
    optionRefs,
  } = useSelectNavigation({
    options: filteredOptions,
  });

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  useEffect(() => {
    if (loading) {
      setOpen(false);
    }
  }, [loading]);

  useEffect(() => {
    const currentOption = options.find((option) =>
      isEqual(option.value, field.value),
    );

    setSelectedOption(currentOption);
    setSearchValue(currentOption?.label ?? "");
  }, [field.value, options]);

  const isDisabled = disabled || loading || !!apiError || options.length === 0;

  const handleOptions = (search: string) => {
    const filtered = options.filter((option) =>
      option.label.toLowerCase().includes(search.toLowerCase()),
    );

    setFilteredOptions(filtered);
    setHighlightedIndex(-1);
  };

  const handleSelect = (option: SelectSearchOption<TValue>) => {
    if (option.disabled || isDisabled || readOnly) return;

    setSelectedOption(option);
    setSearchValue(option.label);
    setFilteredOptions(options);
    setHighlightedIndex(-1);
    setOpen(false);

    field.onChange(option.value);
    onChange?.(option.value);

    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  const handleClear = () => {
    if (isDisabled || readOnly) {
      return;
    }

    setSelectedOption(undefined);
    setSearchValue("");
    setFilteredOptions(options);
    setHighlightedIndex(-1);

    field.onChange(undefined);
    onChange?.(undefined);

    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  const resetListOptions = () => {
    setSearchValue(selectedOption?.label ?? "");
    setFilteredOptions(options);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (isDisabled) {
      return;
    }

    switch (event.key) {
      case "Enter":
        event.preventDefault();

        if (!open) {
          setOpen(true);
          resetListOptions();
          requestAnimationFrame(() => {
            inputRef.current?.focus();
          });
          return;
        }

        if (highlightedIndex >= 0) {
          const option = filteredOptions[highlightedIndex];

          if (option && !option.disabled) {
            handleSelect(option);
          }
        }

        break;

      case "ArrowDown":
        event.preventDefault();

        if (!open) {
          setOpen(true);
          resetListOptions();
          return;
        }

        moveDown();
        break;

      case "ArrowUp":
        event.preventDefault();

        if (!open) {
          setOpen(true);
          resetListOptions();
          return;
        }

        moveUp();
        break;

      case "Escape":
        event.preventDefault();
        setOpen(false);
        break;
    }
  };

  const listboxId = `${name}-listbox`;

  const iconColor = error
    ? themeState.errorColor
    : isDisabled
      ? themeState.grayColor
      : isFocused
        ? themeState.primaryColor
        : themeState.blackColor;

  return (
    <div
      className={`select ${
        error ? "select--error" : ""
      } ${isDisabled ? "select--disabled" : ""}`}
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

      <InputDropdown
        open={open}
        onOpenChange={(nextOpen) => {
          if (isDisabled) return;

          setOpen(nextOpen);
          if (nextOpen) {
            resetListOptions();
          }
        }}
        trigger={
          <div
            className="select__wrapper"
            tabIndex={isDisabled ? -1 : 0}
            role="combobox"
            aria-expanded={open}
            aria-controls={listboxId}
            aria-activedescendant={
              highlightedIndex >= 0
                ? `${listboxId}-option-${highlightedIndex}`
                : undefined
            }
            onClick={() => {
              if (isDisabled) return;

              setOpen(true);
              resetListOptions();

              requestAnimationFrame(() => {
                inputRef.current?.focus();
              });
            }}
            onKeyDown={handleKeyDown}
          >
            {svg && (
              <Icon
                name={apiError ? "Warning" : svg}
                size={16}
                color={apiError ? "red" : iconColor}
              />
            )}

            {!svg && apiError && (
              <Icon name="Warning" size={16} weight="light" color="red" />
            )}

            {loading && <Loader size="xs" text={true} />}
            {!loading && apiError && <ErrorMessage>{apiError}</ErrorMessage>}

            {!loading && !apiError && (
              <>
                {open && <Icon name="MagnifyingGlass" size={16} color="black" />}
                <input
                  id={`${name}-input`}
                  name={name}
                  type="text"
                  value={searchValue}
                  placeholder={placeholder}
                  disabled={disabled}
                  readOnly={readOnly}
                  ref={inputRef}
                  onFocus={() => {
                    if (!isDisabled) {
                      setIsFocused(true);
                      setOpen(true);
                    }
                  }}
                  onBlur={() => {
                    setIsFocused(false);
                    field.onBlur();
                    onBlur?.(field.value);
                  }}
                  onChange={(event) => {
                    const search = event.target.value;
                    setSearchValue(search);
                    handleOptions(search);
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

                {field.value !== undefined && (
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleClear();
                    }}
                    disabled={isDisabled || readOnly}
                    className="select__button"
                    tooltip="delete value"
                  >
                    <Icon name="X" size={16} color={iconColor} />
                  </button>
                )}

                {!open && (
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();

                      if (isDisabled) return;
                      setOpen(true);
                      resetListOptions();
                      /*    requestAnimationFrame(() => {
                        inputRef.current?.focus();
                      }); */
                    }}
                    disabled={isDisabled}
                    className="select__button"
                    tooltip="open"
                  >
                    <Icon name="CaretDown" size={16} color={iconColor} />
                  </button>
                )}

                {open && (
                  <button
                    type="button"
                    onClick={(event) => {
                      if (isDisabled) return;
                      event.stopPropagation();
                      setOpen(false);
                    }}
                    disabled={isDisabled}
                    className="select__button"
                    tooltip="close"
                  >
                    <Icon name="CaretUp" size={16} color={iconColor} />
                  </button>
                )}
              </>
            )}
          </div>
        }
      >
        <div className="select__options" id={listboxId} role="listbox">
          {filteredOptions.map((option, index) => {
            const isSelected = isEqual(selectedOption?.value, option.value);

            return (
              <button
                className={`select__option ${
                  isSelected ? "select__selected" : ""
                } ${highlightedIndex === index ? "select__highlighted" : ""}`}
                id={`${listboxId}-option-${index}`}
                key={index}
                type="button"
                role="option"
                aria-selected={isSelected}
                disabled={option.disabled || readOnly}
                onMouseDown={(event) => {
                  if (option.disabled || readOnly) return;
                  event.preventDefault();
                  handleSelect(option);
                }}
                onMouseEnter={() => {
                  if (option.disabled || readOnly) return;
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
                    className="select__selected"
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

export const SelectSearch = <
  TFieldValues extends FieldValues = FieldValues,
  TValue extends SelectSearchValue = string,
>({
  name,
  options,
  label,
  info,
  placeholder = "Search...",
  required = false,
  disabled = false,
  readOnly = false,
  svg,
  interactive,
  tooltipChildren,
  onChange,
  onBlur,
  loading,
  apiError,
}: SelectSearchProps<TFieldValues, TValue>) => {
  const formContext = useFormContext<TFieldValues>();

  return (
    <Controller
      name={name}
      control={formContext.control}
      rules={{
        required: required ? requiredErrorMessage : false,
      }}
      render={({ field, fieldState }) => (
        <SelectSearchField
          name={name}
          options={options}
          label={label}
          info={info}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          svg={svg}
          interactive={interactive}
          tooltipChildren={tooltipChildren}
          onChange={onChange}
          onBlur={onBlur}
          field={field}
          error={fieldState.error?.message}
          loading={loading}
          apiError={apiError}
        />
      )}
    />
  );
};

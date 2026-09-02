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
import { Checkbox } from "../checkbox/Checkbox";
import { requiredErrorMessage } from "@/utils/errors";
import { Loader } from "@/shared/Loader/Loader";
import "./GlobalSelect.scss";
import { IconButton } from "@/shared/Buttons/IconButton/IconButton";

export type MultiSelectValue = string | number | object;

export type MultiSelectOption<TValue extends MultiSelectValue = string> = {
  label: string;
  value: TValue;
  disabled?: boolean;
};

type MultiSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TValue extends MultiSelectValue = string,
> = {
  name: Path<TFieldValues>;
  options: MultiSelectOption<TValue>[];
  label?: string;
  info?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  svg?: keyof typeof PhosphorIcons;
  interactive?: boolean;
  tooltipChildren?: React.ReactNode;
  onChange?: (value: TValue[]) => void;
  onBlur?: (value: TValue[]) => void;
  loading?: boolean;
  apiError?: string;
};

type MultiSelectFieldProps<
  TFieldValues extends FieldValues,
  TValue extends MultiSelectValue,
> = MultiSelectProps<TFieldValues, TValue> & {
  field: {
    value: TValue[];
    onChange: (value: TValue[]) => void;
    onBlur: () => void;
  };
  error?: string;
};

const MultiSelectField = <
  TFieldValues extends FieldValues,
  TValue extends MultiSelectValue,
>({
  name,
  options,
  label,
  info,
  placeholder = "Search...",
  required = false,
  disabled = false,
  readOnly = false,
  interactive,
  tooltipChildren,
  onChange,
  onBlur,
  field,
  error,
  loading = false,
  apiError,
}: MultiSelectFieldProps<TFieldValues, TValue>) => {
  const { themeState } = useTheme();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [open, setOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const [filteredOptions, setFilteredOptions] =
    useState<MultiSelectOption<TValue>[]>(options);

  const [searchValue, setSearchValue] = useState("");

  const [selectedOptions, setSelectedOptions] = useState<
    MultiSelectOption<TValue>[]
  >([]);

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
    const currentOptions = options.filter((option) =>
      field.value.some((value) => isEqual(value, option.value)),
    );

    setSelectedOptions(currentOptions);
  }, [field.value, options]);

  useEffect(() => {
    if (loading) {
      setOpen(false);
    }
  }, [loading]);

  const isDisabled = disabled || loading || !!apiError || options.length === 0;

  const handleOptions = (search: string) => {
    const filtered = options.filter((option) =>
      option.label.toLowerCase().includes(search.toLowerCase()),
    );

    setFilteredOptions(filtered);
    setHighlightedIndex(-1);
  };

  const handleSelect = (option: MultiSelectOption<TValue>) => {
    if (option.disabled || isDisabled || readOnly) return;

    const selected = selectedOptions.some((selectedOption) =>
      isEqual(selectedOption.value, option.value),
    );

    const newSelectedOptions = selected
      ? selectedOptions.filter(
          (selectedOption) => !isEqual(selectedOption.value, option.value),
        )
      : [...selectedOptions, option];

    setSelectedOptions(newSelectedOptions);

    const newValue = newSelectedOptions.map(
      (selectedOption) => selectedOption.value,
    );

    field.onChange(newValue);
    onChange?.(newValue);
  };

  const clearSelection = () => {
    if (isDisabled || readOnly) return;

    setSelectedOptions([]);
    setSearchValue("");
    setFilteredOptions(options);
    setHighlightedIndex(-1);
    field.onChange([]);
    onChange?.([]);
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  const resetListOptions = () => {
    setSearchValue("");
    setFilteredOptions(options);
    setHighlightedIndex(-1);
  };

  const showOnlySelected = () => {
    if (selectedOptions.length === 0 || isDisabled || readOnly) {
      return;
    }

    const filtered = options.filter((option) =>
      selectedOptions.some((selectedOption) =>
        isEqual(selectedOption.value, option.value),
      ),
    );

    setFilteredOptions(filtered);
    setHighlightedIndex(-1);
  };

  const showNotSelected = () => {
    if (selectedOptions.length === 0 || isDisabled || readOnly) {
      return;
    }

    const filtered = options.filter(
      (option) =>
        !selectedOptions.some((selectedOption) =>
          isEqual(selectedOption.value, option.value),
        ),
    );

    setFilteredOptions(filtered);
    setHighlightedIndex(-1);
  };

  const selectAll = () => {
    if (isDisabled || readOnly) return;

    const newSelectedOptions = [
      ...selectedOptions,
      ...filteredOptions.filter(
        (option) =>
          !option.disabled &&
          !selectedOptions.some((selectedOption) =>
            isEqual(selectedOption.value, option.value),
          ),
      ),
    ];

    setSelectedOptions(newSelectedOptions);

    const newValue = newSelectedOptions.map((option) => option.value);

    field.onChange(newValue);
    onChange?.(newValue);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (isDisabled || readOnly) {
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

          requestAnimationFrame(() => {
            inputRef.current?.focus();
          });

          return;
        }

        moveDown();
        break;

      case "ArrowUp":
        event.preventDefault();

        if (!open) {
          setOpen(true);
          resetListOptions();

          requestAnimationFrame(() => {
            inputRef.current?.focus();
          });
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
          if (isDisabled || readOnly) return;

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
              if (isDisabled || readOnly) return;
              setOpen(true);
              resetListOptions();
              requestAnimationFrame(() => {
                inputRef.current?.focus();
              });
            }}
            onKeyDown={handleKeyDown}
          >
            {loading && <Loader size="s" text={true} />}
            {!loading && apiError && <ErrorMessage>{apiError}</ErrorMessage>}
            {!loading && !apiError && (
              <div className="select__multi">
                <div className="select__multi__value">
                  <button
                    type="button"
                    disabled={
                      isDisabled || readOnly || selectedOptions.length === 0
                    }
                    className="select__multi__value__button"
                  >
                    {selectedOptions.length} selected
                  </button>
                </div>
                <div className="select__multi__value__actions">
                  {!open && (
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        if (isDisabled) return;
                        setOpen(true);
                        resetListOptions();
                        requestAnimationFrame(() => {
                          inputRef.current?.focus();
                        });
                      }}
                      disabled={isDisabled || readOnly}
                      className="select__button"
                    >
                      <Icon name="CaretDown" size={16} color={iconColor} />
                    </button>
                  )}
                  {open && (
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        if (isDisabled) return;
                        setOpen(false);
                      }}
                      disabled={isDisabled || readOnly}
                      className="select-search__button"
                    >
                      <Icon name="CaretUp" size={16} color={iconColor} />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        }
      >
        <div className="select__multiOptions" id={listboxId} role="listbox">
          <div className="select__multiOptions__filters">
            <Icon name="MagnifyingGlass" size={16} color="black" />
            <input
              id={`${name}-input`}
              name={name}
              type="text"
              value={searchValue}
              placeholder={placeholder}
              disabled={isDisabled}
              ref={inputRef}
              onFocus={() => {
                if (!isDisabled && !readOnly) {
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

            <>
              {open && (
                <IconButton
                  label="Reset Filters"
                  icon="List"
                  onClick={resetListOptions}
                  size="s"
                  variant="secondary"
                  disabled={disabled}
                />
              )}

              {open && (
                <IconButton
                  icon="ListBullets"
                  label="Show Not selected"
                  onClick={showNotSelected}
                  size="s"
                  variant="secondary"
                  disabled={disabled || readOnly}
                />
              )}

              {open && (
                <IconButton
                  icon="ListChecks"
                  label="Show Selected"
                  onClick={showOnlySelected}
                  size="s"
                  variant="secondary"
                  disabled={disabled || readOnly}
                />
              )}

              {open && (
                <IconButton
                  icon="Check"
                  label="Select all"
                  onClick={selectAll}
                  disabled={isDisabled || readOnly}
                  size="s"
                  variant="secondary"
                />
              )}

              {open && (
                <IconButton
                  icon="Trash"
                  label="Deselect all"
                  onClick={clearSelection}
                  disabled={isDisabled || readOnly}
                  size="s"
                  variant="secondary"
                />
              )}
            </>
          </div>

          {filteredOptions.map((option, index) => {
            const isSelected = selectedOptions.some((selectedOption) =>
              isEqual(selectedOption.value, option.value),
            );

            return (
              <button
                className={`select__option ${
                  isSelected ? "select__selected" : ""
                } ${highlightedIndex === index ? "select__highlighted" : ""}`}
                key={index}
                id={`${listboxId}-option-${index}`}
                type="button"
                role="option"
                aria-selected={isSelected}
                disabled={option.disabled || isDisabled || readOnly}
                onMouseDown={(event) => {
                  if (option.disabled || isDisabled || readOnly) {
                    return;
                  }

                  event.preventDefault();
                  handleSelect(option);
                }}
                onMouseEnter={() => {
                  if (!option.disabled && !isDisabled && !readOnly) {
                    setHighlightedIndex(index);
                  }
                }}
                ref={(element) => {
                  optionRefs.current[index] = element;
                }}
              >
                <Checkbox
                  name={option.label}
                  label={option.label}
                  checked={isSelected}
                  disabled={option.disabled || readOnly}
                />
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

export const MultiSelect = <
  TFieldValues extends FieldValues = FieldValues,
  TValue extends MultiSelectValue = string,
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
  loading = false,
  apiError,
}: MultiSelectProps<TFieldValues, TValue>) => {
  const { control } = useFormContext<TFieldValues>();

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ? requiredErrorMessage : false,
      }}
      render={({ field, fieldState }) => (
        <MultiSelectField
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
          loading={loading}
          apiError={apiError}
          field={field}
          error={fieldState.error?.message}
        />
      )}
    />
  );
};

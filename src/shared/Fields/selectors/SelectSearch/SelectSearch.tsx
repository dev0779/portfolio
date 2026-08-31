
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
import { IconTooltip } from "@/shared/Tooltip/icon-tooltip/IconTooltip";
import "./SelectSearch.scss";
import { ErrorMessage } from "../../fields-styled/Fields.styled";
import { useSelectNavigation } from "@/hooks/useSelectNavigation";
import { InputDropdown } from "../Dropdown/InputDropdown";

export type SelectSearchValue = string | number | object;

export type SelectSearchOption<
  TValue extends SelectSearchValue = string,
> = {
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
}: SelectSearchProps<TFieldValues, TValue>) => {
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

  const formContext = useFormContext<TFieldValues>();

  const iconColor = (error?: string) =>
    error
      ? themeState.errorColor
      : disabled
        ? themeState.grayColor
        : isFocused
          ? themeState.primaryColor
          : themeState.blackColor;

  return (
    <Controller
      name={name}
      control={formContext.control}
      rules={{
        required: required
          ? "Please select an option"
          : false,
      }}
      render={({ field, fieldState }) => {
        useEffect(() => {
          const currentOption = options.find((option) =>
            isEqual(option.value, field.value),
          );

          setSelectedOption(currentOption);
          setSearchValue(currentOption?.label ?? "");
        }, [field.value, options]);

        const handleOptions = (search: string) => {
          const filtered = options.filter((option) =>
            option.label
              .toLowerCase()
              .includes(search.toLowerCase()),
          );

          setFilteredOptions(filtered);
          setHighlightedIndex(-1);
        };

        const handleSelect = (
          option: SelectSearchOption<TValue>,
        ) => {
          if (option.disabled) return;

          setSelectedOption(option);
          setSearchValue(option.label);
          setFilteredOptions(options);
          setHighlightedIndex(-1);
          setOpen(false);

          field.onChange(option.value);
          onChange?.(option.value);
        };

        const handleClear = () => {
          setSelectedOption(undefined);
          setSearchValue("");
          setFilteredOptions(options);
          setHighlightedIndex(-1);

          field.onChange(undefined);
          onChange?.(undefined);
        };

        const resetListOptions = () => {
          setSearchValue(selectedOption?.label ?? "");
          setFilteredOptions(options);
          setHighlightedIndex(-1);
        };

        const handleKeyDown = (
          event: React.KeyboardEvent<HTMLDivElement>,
        ) => {
          if (disabled || readOnly) return;

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
                const option =
                  filteredOptions[highlightedIndex];

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

        return (
          <div
            className={`select-search ${
              fieldState.error
                ? "select-search--error"
                : ""
            } ${
              disabled
                ? "select-search--disabled"
                : ""
            }`}
          >
            {label && (
              <div className="select-search__label">
                {label}

                {required && (
                  <span className="select-search__required">
                    *
                  </span>
                )}

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
              onOpenChange={(event) => {
                setOpen(event);

                if (event) {
                  resetListOptions();
                }
              }}
              trigger={
                <div
                  className="select-search__wrapper"
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
                    if (disabled || readOnly) return;

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
                      name={svg}
                      size={16}
                      color={iconColor(
                        fieldState.error?.message,
                      )}
                    />
                  )}

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
                      if (!disabled && !readOnly) {
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
                      disabled={disabled}
                      className="select-search__button"
                    >
                      <Icon
                        name="X"
                        size={16}
                        color={iconColor(
                          fieldState.error?.message,
                        )}
                      />
                    </button>
                  )}

                  {!open && (
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();

                        if (disabled || readOnly) return;

                        setOpen(true);
                        resetListOptions();

                        requestAnimationFrame(() => {
                          inputRef.current?.focus();
                        });
                      }}
                      disabled={disabled}
                      className="select-search__button"
                    >
                      <Icon
                        name="CaretDown"
                        size={16}
                        color={iconColor(
                          fieldState.error?.message,
                        )}
                      />
                    </button>
                  )}

                  {open && (
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        setOpen(false);
                      }}
                      disabled={disabled}
                      className="select-search__button"
                    >
                      <Icon
                        name="CaretUp"
                        size={16}
                        color={iconColor(
                          fieldState.error?.message,
                        )}
                      />
                    </button>
                  )}
                </div>
              }
            >
              <div
                className="select-search__options"
                id={listboxId}
                role="listbox"
              >
                {filteredOptions.map((option, index) => {
                  const isSelected = isEqual(
                    selectedOption?.value,
                    option.value,
                  );

                  return (
                    <button
                      className={`select-search__option ${
                        isSelected
                          ? "select-search__selected"
                          : ""
                      } ${
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
                        optionRefs.current[index] =
                          element;
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
                          hoverColor={
                            themeState.whiteColor
                          }
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
                  <ErrorMessage>
                    No Results Found
                  </ErrorMessage>
                )}
              </div>
            </InputDropdown>

            {fieldState.error && (
              <ErrorMessage>
                {fieldState.error.message}
              </ErrorMessage>
            )}
          </div>
        );
      }}
    />
  );
};


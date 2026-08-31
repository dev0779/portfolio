import React, { useEffect, useRef, useState } from "react";

import {
  Controller,
  useFormContext,
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
import { Checkbox } from "../../checkbox/Checkbox";

export type MultiSelectValue = string | number | object;

export type MultiSelectOption<
  TValue extends MultiSelectValue = string,
> = {
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
}: MultiSelectProps<TFieldValues, TValue>) => {
  const { themeState } = useTheme();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const [open, setOpen] = useState(false);

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

  const { control } = useFormContext<TFieldValues>();

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required
          ? "Please select an option"
          : false,
      }}
      render={({ field, fieldState }) => {
        const currentValue =
          (field.value as TValue[] | undefined) ?? [];

        useEffect(() => {
          const currentOptions = options.filter((option) =>
            currentValue.some((value) =>
              isEqual(value, option.value),
            ),
          );

          setSelectedOptions(currentOptions);
        }, [currentValue, options]);

        const handleSelect = (
          option: MultiSelectOption<TValue>,
        ) => {
          if (option.disabled) return;

          const selected = selectedOptions.some(
            (selectedOption) =>
              isEqual(
                selectedOption.value,
                option.value,
              ),
          );

          let newSelectedOptions:
            MultiSelectOption<TValue>[];

          if (selected) {
            newSelectedOptions =
              selectedOptions.filter(
                (selectedOption) =>
                  !isEqual(
                    selectedOption.value,
                    option.value,
                  ),
              );
          } else {
            newSelectedOptions = [
              ...selectedOptions,
              option,
            ];
          }

          setSelectedOptions(newSelectedOptions);

          const newValue = newSelectedOptions.map(
            (selectedOption) =>
              selectedOption.value,
          );

          field.onChange(newValue);
        };

        const resetListOptions = () => {
          setSearchValue("");
          setFilteredOptions(options);
          setHighlightedIndex(-1);
        };

        const handleOptions = (search: string) => {
          const findOptions = options.filter((option) =>
            option.label
              .toLowerCase()
              .includes(search.toLowerCase()),
          );

          setFilteredOptions(findOptions);
          setHighlightedIndex(-1);
        };

        const handleClear = () => {
          field.onChange([]);
          setSearchValue("");
          setSelectedOptions([]);
          setFilteredOptions(options);
          setHighlightedIndex(-1);
        };

        const showOnlySelected = () => {
          if (selectedOptions.length === 0) return;

          const filter = options.filter((option) =>
            selectedOptions.some((selectedOption) =>
              isEqual(
                selectedOption.value,
                option.value,
              ),
            ),
          );

          setFilteredOptions(filter);
          setHighlightedIndex(-1);
        };

        const showNotSelected = () => {
          if (selectedOptions.length === 0) return;

          const filter = options.filter(
            (option) =>
              !selectedOptions.some((selectedOption) =>
                isEqual(
                  selectedOption.value,
                  option.value,
                ),
              ),
          );

          setFilteredOptions(filter);
          setHighlightedIndex(-1);
        };

        const selectAll = () => {
          const newSelectedOptions = [
            ...selectedOptions,
            ...filteredOptions.filter(
              (option) =>
                !option.disabled &&
                !selectedOptions.some(
                  (selectedOption) =>
                    isEqual(
                      selectedOption.value,
                      option.value,
                    ),
                ),
            ),
          ];

          setSelectedOptions(newSelectedOptions);

          const newValue = newSelectedOptions.map(
            (option) => option.value,
          );

          field.onChange(newValue);
        };

        const resetSelected = () => {
          setSelectedOptions([]);
          setFilteredOptions(options);
          setSearchValue("");
          setHighlightedIndex(-1);

          field.onChange([]);
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

              if (open) {
                setOpen(false);
              }

              break;
          }
        };

        const iconColor = fieldState.error
          ? themeState.errorColor
          : disabled
            ? themeState.grayColor
            : inputRef.current ===
                document.activeElement
              ? themeState.primaryColor
              : themeState.blackColor;

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
                  ref={triggerRef}
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
                    setOpen(true);
                    setSearchValue("");
                    setFilteredOptions(options);
                  }}
                  onKeyDown={handleKeyDown}
                >
                  {svg && (
                    <Icon
                      name={svg}
                      size={16}
                      color={iconColor}
                    />
                  )}

                  {!open && (
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleClear();
                      }}
                      disabled={
                        disabled ||
                        currentValue.length === 0
                      }
                      className="select-search__button"
                    >
                      <Icon
                        name="X"
                        size={16}
                        color={iconColor}
                      />

                      {currentValue.length} selected
                    </button>
                  )}

                  {!open && (
                    <button
                      type="button"
                      onClick={() => setOpen(true)}
                      disabled={disabled}
                      className="select-search__button"
                    >
                      <Icon
                        name="CaretDown"
                        size={16}
                        color={iconColor}
                      />
                    </button>
                  )}

                  {open && (
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      disabled={disabled}
                      className="select-search__button"
                    >
                      <Icon
                        name="CaretUp"
                        size={16}
                        color={iconColor}
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
                <div>
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
                        setOpen(true);
                      }
                    }}
                    onBlur={field.onBlur}
                    onChange={(event) => {
                      const search =
                        event.target.value;

                      setSearchValue(search);
                      handleOptions(search);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Escape") {
                        event.preventDefault();
                        setOpen(false);
                        return;
                      }

                      if (event.key === "ArrowDown") {
                        event.preventDefault();
                        moveDown();
                        return;
                      }

                      if (event.key === "ArrowUp") {
                        event.preventDefault();
                        moveUp();
                        return;
                      }

                      if (event.key === "Enter") {
                        event.preventDefault();

                        if (highlightedIndex >= 0) {
                          const option =
                            filteredOptions[
                              highlightedIndex
                            ];

                          if (
                            option &&
                            !option.disabled
                          ) {
                            handleSelect(option);
                          }
                        }
                      }
                    }}
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

                  <div>
                    {open && (
                      <IconTooltip
                        name="List"
                        tooltip="Reset List"
                        onClick={resetListOptions}
                      />
                    )}

                    {open &&
                      selectedOptions.length > 0 && (
                        <IconTooltip
                          name="ListBullets"
                          tooltip="Show Not selected"
                          onClick={showNotSelected}
                        />
                      )}

                    {open &&
                      selectedOptions.length > 0 && (
                        <IconTooltip
                          name="ListChecks"
                          tooltip="Show Selected"
                          onClick={showOnlySelected}
                        />
                      )}

                    {open && (
                      <IconTooltip
                        name="ListChecked"
                        tooltip="Select all"
                        onClick={selectAll}
                      />
                    )}

                    {open &&
                      selectedOptions.length > 0 && (
                        <IconTooltip
                          name="List"
                          tooltip="Deselect all"
                          onClick={resetSelected}
                        />
                      )}
                  </div>
                </div>

                {filteredOptions.map(
                  (option, index) => {
                    const isSelected =
                      selectedOptions.some(
                        (selectedOption) =>
                          isEqual(
                            selectedOption.value,
                            option.value,
                          ),
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
                        key={index}
                        id={`${listboxId}-option-${index}`}
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
                        <Checkbox
                          name={option.label}
                          label={option.label}
                          checked={isSelected}
                        />

                        {option.label}
                      </button>
                    );
                  },
                )}

                {filteredOptions.length === 0 && (
                  <ErrorMessage>
                    No Results Found
                  </ErrorMessage>
                )}
              </div>
            </InputDropdown>

            {fieldState.error?.message && (
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


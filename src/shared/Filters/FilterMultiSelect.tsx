import React, { useEffect, useRef, useState } from "react";

import * as PhosphorIcons from "phosphor-react";

import { Icon } from "@/shared/Icons/Icon";
import { useTheme } from "@/hooks";
import { IconTooltip } from "@/shared/Tooltip/icon-tooltip/IconTooltip";

import "./FilterSelect.scss";

import { useSelectNavigation } from "@/hooks/useSelectNavigation";
import isEqual from "lodash/isEqual";
import { ErrorMessage } from "../Fields/fields-styled/Fields.styled";
import { InputDropdown } from "../Fields/selectors/Dropdown/InputDropdown";
import { Checkbox } from "../Fields/checkbox/Checkbox";
import { Loader } from "@/shared/Loader/Loader";

export type MultiSelectValue = string | number | object;

export type MultiSelectOption<TValue extends MultiSelectValue = string> = {
  label: string;
  value: TValue;
  disabled?: boolean;
};

type MultiSelectFilterProps<TValue extends MultiSelectValue = string> = {
  options: MultiSelectOption<TValue>[];
  value?: TValue[];
  label?: string;
  info?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  svg?: keyof typeof PhosphorIcons;
  interactive?: boolean;
  tooltipChildren?: React.ReactNode;
  loading?: boolean;
  apiError?: string;
  onChange?: (value: TValue[] | undefined) => void;
  onBlur?: (value: TValue[] | undefined) => void;
};

export const FilterMultiSelect = <TValue extends MultiSelectValue = string>({
  options,
  value = [],
  label,
  info,
  placeholder = "Search...",
  disabled = false,
  readOnly = false,
  onChange,
  onBlur,
  interactive,
  tooltipChildren,
  loading,
  apiError,
}: MultiSelectFilterProps<TValue>) => {
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

  const isDisabled = disabled || loading || !!apiError || options.length === 0;

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  useEffect(() => {
    const currentOptions = options.filter((option) =>
      value.some((selectedValue) => isEqual(selectedValue, option.value)),
    );
    setSelectedOptions(currentOptions);
  }, [value, options]);

  useEffect(() => {
    if (loading) {
      setOpen(false);
    }
  }, [loading]);

  const handleSelect = (option: MultiSelectOption<TValue>) => {
    if (option.disabled || readOnly) return;

    const selected = selectedOptions.some((selectedOption) =>
      isEqual(selectedOption.value, option.value),
    );

    let newSelectedOptions: MultiSelectOption<TValue>[];

    if (selected) {
      newSelectedOptions = selectedOptions.filter(
        (selectedOption) => !isEqual(selectedOption.value, option.value),
      );
    } else {
      newSelectedOptions = [...selectedOptions, option];
    }

    setSelectedOptions(newSelectedOptions);

    const optionsToSend = newSelectedOptions.map(
      (selectedOption) => selectedOption.value,
    );

    onChange?.(optionsToSend);
  };

  const handleOptions = (search: string) => {
    const findOptions = options.filter((option) =>
      option.label.toLowerCase().includes(search.toLowerCase()),
    );

    setFilteredOptions(findOptions);
    setHighlightedIndex(-1);
  };

  const resetListOptions = () => {
    setSearchValue("");
    setFilteredOptions(options);
    setHighlightedIndex(-1);
  };

  const handleClear = () => {
    setSelectedOptions([]);
    setSearchValue("");
    setFilteredOptions(options);
    setHighlightedIndex(-1);

    onChange?.([]);
  };

  const showOnlySelected = () => {
    if (selectedOptions.length === 0) return;

    const filter = options.filter((option) =>
      selectedOptions.some((selectedOption) =>
        isEqual(selectedOption.value, option.value),
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
          isEqual(selectedOption.value, option.value),
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
          !selectedOptions.some((selectedOption) =>
            isEqual(selectedOption.value, option.value),
          ),
      ),
    ];

    setSelectedOptions(newSelectedOptions);

    const optionsToSend = newSelectedOptions.map((option) => option.value);

    onChange?.(optionsToSend);
  };

  const resetSelected = () => {
    setSelectedOptions([]);
    setFilteredOptions(options);
    setSearchValue("");
    setHighlightedIndex(-1);

    onChange?.([]);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (isDisabled) return;

    switch (event.key) {
      case "Enter":
        event.preventDefault();

        if (!open) {
          setOpen(true);
          resetListOptions();
          return;
        }

        if (highlightedIndex >= 0) {
          const option = filteredOptions[highlightedIndex];

          if (option && !option.disabled && !readOnly) {
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

  const iconColor = isDisabled
    ? themeState.grayColor
    : inputRef.current === document.activeElement
      ? themeState.primaryColor
      : themeState.blackColor;

  const listboxId = "filter-select-multi-select-filter-listbox";

  return (
    <div
      className={`filter-select ${isDisabled ? "filter-select--disabled" : ""}`}
    >
      {label && (
        <div className="filter-select__label">
          {label}

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
          if (isDisabled) return;
          setOpen(event);

          if (event) {
            resetListOptions();
          }
        }}
        trigger={
          <div
            className="filter-select__wrapper"
            ref={triggerRef}
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
              setSearchValue("");
              setFilteredOptions(options);
              requestAnimationFrame(() => {
                inputRef.current?.focus();
              });
            }}
            onKeyDown={handleKeyDown}
          >
            {loading && <Loader size="s" text={true} />}
            {!loading && apiError && <ErrorMessage>{apiError}</ErrorMessage>}
            {!open && !loading && !apiError && value.length > 0 && (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  handleClear();
                }}
                disabled={isDisabled}
                className="filter-select__button"
              >
                <Icon name="X" size={16} color={iconColor} />
                {value.length} selected
              </button>
            )}

            {!open && !loading && !apiError && (
              <button
                type="button"
                onClick={() => setOpen(true)}
                disabled={isDisabled}
                className="filter-select__button"
              >
                <Icon name="CaretDown" size={16} color={iconColor} />
              </button>
            )}

            {open && !loading && !apiError && (
              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={isDisabled}
                className="filter-select__button"
              >
                <Icon name="CaretUp" size={16} color={iconColor} />
              </button>
            )}
          </div>
        }
      >
        <div className="filter-select__options" id={listboxId} role="listbox">
          <div>
            <input
              id={`${listboxId}-input`}
              type="text"
              value={searchValue}
              placeholder={placeholder}
              disabled={isDisabled}
              ref={inputRef}
              onFocus={() => {
                if (!isDisabled) {
                  setOpen(true);
                }
              }}
              onBlur={() => {
                onBlur?.(value);
              }}
              onChange={(event) => {
                const search = event.target.value;
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
                    const option = filteredOptions[highlightedIndex];

                    if (option && !option.disabled) {
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

              {open && selectedOptions.length > 0 && (
                <IconTooltip
                  name="ListBullets"
                  tooltip="Show Not selected"
                  onClick={showNotSelected}
                />
              )}

              {open && selectedOptions.length > 0 && (
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
                  disabled={readOnly}
                />
              )}

              {open && selectedOptions.length > 0 && (
                <IconTooltip
                  name="List"
                  tooltip="Deselect all"
                  onClick={resetSelected}
                  disabled={readOnly}
                />
              )}
            </div>
          </div>

          {filteredOptions.map((option, index) => {
            const isSelected = selectedOptions.some((selectedOption) =>
              isEqual(selectedOption.value, option.value),
            );

            return (
              <button
                className={`filter-select__option ${
                  isSelected ? "filter-select__selected" : ""
                } ${
                  highlightedIndex === index ? "filter-select__highlighted" : ""
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
                  if (option.disabled) return;
                  setHighlightedIndex(index);
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

                {option.label}
              </button>
            );
          })}

          {filteredOptions.length === 0 && (
            <ErrorMessage>No Results Found</ErrorMessage>
          )}
        </div>
      </InputDropdown>
    </div>
  );
};

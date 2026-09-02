import React, { useEffect, useRef, useState } from "react";

import * as PhosphorIcons from "phosphor-react";

import { Icon } from "@/shared/Icons/Icon";
import { useTheme } from "@/hooks";
import { IconTooltip } from "@/shared/Tooltip/IconTooltip/IconTooltip";
import { useSelectNavigation } from "@/hooks/useSelectNavigation";
import isEqual from "lodash/isEqual";
import { ErrorMessage } from "../Fields/fields-styled/Fields.styled";
import { InputDropdown } from "../Fields/selectors/Dropdown/InputDropdown";
import { Checkbox } from "../Fields/checkbox/Checkbox";
import { Loader } from "@/shared/Loader/Loader";

import "./../Fields/selectors/GlobalSelect.scss";
import { IconButton } from "../Buttons/IconButton/IconButton";
import { useForm } from "react-hook-form";
import { FilterCheckbox } from "./FilterCheckbox";

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

  const listboxId = "multi-select-filter-listbox";

  return (
    <div className={`select ${isDisabled ? "select--disabled" : ""}`}>
      {label && (
        <div className="select__label">
          {label}

          {info && (
            <IconTooltip
              name="Info"
              weight="regular"
              color="black"
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
        onOpenChange={(event) => {
          if (isDisabled) return;
          setOpen(event);

          if (event) {
            resetListOptions();
          }
        }}
        trigger={
          <div
            className="select__wrapper"
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
            {!loading && !apiError && (
              <div className="select__multi">
                <div className="select__multi__value">
                  <button
                    type="button"
                    disabled={isDisabled}
                    className="select__multi__value__button"
                  >
                    {selectedOptions?.length} selected
                  </button>
                </div>
              </div>
            )}

            <div className="select__multi__value__actions">
              {!open && !loading && !apiError && (
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  disabled={isDisabled}
                  className="select__button"
                >
                  <Icon name="CaretDown" size={16} color={iconColor} />
                </button>
              )}

              {open && !loading && !apiError && (
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  disabled={isDisabled}
                  className="select__button"
                >
                  <Icon name="CaretUp" size={16} color={iconColor} />
                </button>
              )}
            </div>
          </div>
        }
      >
        <div className="select__multiOptions" id={listboxId} role="listbox">
          <div className="select__multiOptions__filters">
            <Icon name="MagnifyingGlass" size={16} color="black" />
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
                  onClick={resetSelected}
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
                <FilterCheckbox
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
    </div>
  );
};

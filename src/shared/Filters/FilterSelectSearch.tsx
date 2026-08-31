import React, { useEffect, useRef, useState } from "react";

import * as PhosphorIcons from "phosphor-react";
import isEqual from "lodash/isEqual";

import { Icon } from "@/shared/Icons/Icon";
import { useTheme } from "@/hooks";
import { IconTooltip } from "@/shared/Tooltip/icon-tooltip/IconTooltip";
import "./FilterSelect.scss";
import { ErrorMessage } from "../Fields/fields-styled/Fields.styled";
import { useSelectNavigation } from "@/hooks/useSelectNavigation";
import { InputDropdown } from "../Fields/selectors/Dropdown/InputDropdown";
import { Loader } from "@/shared/Loader/Loader";

export type SelectSearchValue = string | number | object;

export type SelectSearchOption<TValue extends SelectSearchValue = string> = {
  label: string;
  value: TValue;
  disabled?: boolean;
};

export type SelectSearchFilterProps<TValue extends SelectSearchValue = string> =
  {
    options: SelectSearchOption<TValue>[];
    value?: TValue;
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
    onChange?: (value: TValue | undefined) => void;
    onBlur?: (value: TValue | undefined) => void;
  };

export const SelectSearchFilter = <TValue extends SelectSearchValue = string>({
  options,
  value,
  label,
  info,
  placeholder = "Search...",
  disabled = false,
  readOnly = false,
  svg,
  loading,
  apiError,
  onChange,
  onBlur,
  interactive,
  tooltipChildren,
}: SelectSearchFilterProps<TValue>) => {
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
    const currentOption = (options ?? []).find((option) =>
      isEqual(option.value, value),
    );
    setSearchValue(currentOption?.label ?? "");
    setSelectedOption(currentOption);
  }, [value, options]);

  useEffect(() => {
    if (loading) {
      setOpen(false);
    }
  }, [loading]);

  const isDisabled = disabled || loading || !!apiError;

  const handleOptions = (search: string) => {
    const filtered = options.filter((option) =>
      option.label.toLowerCase().includes(search.toLowerCase()),
    );

    setFilteredOptions(filtered);
    setHighlightedIndex(-1);
  };

  const handleSelect = (option: SelectSearchOption<TValue>) => {
    if (option.disabled) return;

    setSelectedOption(option);
    setSearchValue(option.label);
    setFilteredOptions(options);
    setHighlightedIndex(-1);
    setOpen(false);

    onChange?.(option.value);
  };

  const handleClear = () => {
    setSelectedOption(undefined);
    setSearchValue("");
    setFilteredOptions(options);
    setHighlightedIndex(-1);

    onChange?.(undefined);
  };

  const resetListOptions = () => {
    setSearchValue(selectedOption?.label ?? "");
    setFilteredOptions(options);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (isDisabled || readOnly) return;

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

  const iconColor = isDisabled
    ? themeState.grayColor
    : isFocused
      ? themeState.primaryColor
      : themeState.blackColor;

  const listboxId = "filter-select-search-listbox";

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
            }}
            onKeyDown={handleKeyDown}
          >
            {svg && <Icon name={svg} size={16} color={iconColor} />}

            {loading && <Loader size="s" text={true} />}
            {!loading && apiError && <ErrorMessage>{apiError}</ErrorMessage>}
            {!loading && !apiError && (
              <>
                <input
                  id="filterselectsearch-filter-input"
                  type="text"
                  value={searchValue}
                  placeholder={placeholder}
                  disabled={isDisabled}
                  readOnly={readOnly}
                  ref={inputRef}
                  onFocus={() => {
                    if (!isDisabled && !readOnly) {
                      setIsFocused(true);
                      setOpen(true);
                    }
                  }}
                  onBlur={() => {
                    setIsFocused(false);
                    onBlur?.(value);
                  }}
                  onChange={(event) => {
                    const search = event.target.value;

                    setSearchValue(search);
                    handleOptions(search);
                  }}
                  onKeyDown={(event) => {
                    handleKeyDown(event);
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

                {value !== undefined && (
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
                  </button>
                )}

                {!open && (
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();

                      if (isDisabled || readOnly) return;

                      setOpen(true);
                      resetListOptions();

                      requestAnimationFrame(() => {
                        inputRef.current?.focus();
                      });
                    }}
                    disabled={isDisabled}
                    className="filter-select__button"
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
                    className="filter-select__button"
                  >
                    <Icon name="CaretUp" size={16} color={iconColor} />
                  </button>
                )}
              </>
            )}
          </div>
        }
      >
        <div className="filter-select__options" id={listboxId} role="listbox">
          {filteredOptions.map((option, index) => {
            const isSelected = isEqual(selectedOption?.value, option.value);

            return (
              <button
                className={`filter-select__option ${
                  isSelected ? "filter-select__selected" : ""
                } ${
                  highlightedIndex === index ? "filter-select__highlighted" : ""
                }`}
                id={`${listboxId}-option-${index}`}
                key={index}
                type="button"
                role="option"
                aria-selected={isSelected}
                disabled={option.disabled || readOnly}
                onMouseDown={(event) => {
                  if (option.disabled) return;
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
                    className="filter-select__selected"
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
    </div>
  );
};

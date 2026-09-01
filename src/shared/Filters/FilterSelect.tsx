import React, { useEffect, useRef, useState } from "react";

import * as PhosphorIcons from "phosphor-react";
import isEqual from "lodash/isEqual";

import { Icon } from "@/shared/Icons/Icon";
import { useTheme } from "@/hooks";
import { IconTooltip } from "@/shared/Tooltip/IconTooltip/IconTooltip";
import "./FilterSelect.scss";
import { ErrorMessage } from "../Fields/fields-styled/Fields.styled";
import { useSelectNavigation } from "@/hooks/useSelectNavigation";
import { InputDropdown } from "../Fields/selectors/Dropdown/InputDropdown";
import { Loader } from "@/shared/Loader/Loader";

export type SelectValue = string | number | object;

export type SelectOption<TValue extends SelectValue = string> = {
  label: string;
  value: TValue;
  disabled?: boolean;
};

export type SelectFilterProps<TValue extends SelectValue = string> = {
  options: SelectOption<TValue>[];
  value?: TValue;
  label?: string;
  info?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  clearable?: boolean;
  svg?: keyof typeof PhosphorIcons;
  interactive?: boolean;
  tooltipChildren?: React.ReactNode;
  loading?: boolean;
  apiError?: string;
  onChange?: (value: TValue | undefined) => void;
  onBlur?: (value: TValue | undefined) => void;
};

export const SelectFilter = <TValue extends SelectValue = string>({
  options,
  value,
  label,
  info,
  placeholder = "Select an option",
  disabled = false,
  readOnly = false,
  svg,
  interactive,
  tooltipChildren,
  loading,
  apiError,
  onChange,
  onBlur,
}: SelectFilterProps<TValue>) => {
  const { themeState } = useTheme();

  const selectRef = useRef<HTMLDivElement | null>(null);

  const [open, setOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

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

  useEffect(() => {
    const currentOption = options.find((option) =>
      isEqual(option.value, value),
    );

    setSelectedOption(currentOption);
  }, [value, options]);

  useEffect(() => {
    if (loading) {
      setOpen(false);
    }
  }, [loading]);

  const isDisabled = disabled || loading || !!apiError || options.length === 0;

  const handleSelect = (option: SelectOption<TValue>) => {
    if (isDisabled || option.disabled || readOnly) {
      return;
    }

    setSelectedOption(option);
    setOpen(false);
    setHighlightedIndex(-1);

    onChange?.(option.value);
    requestAnimationFrame(() => {
      selectRef.current?.focus();
    });
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (isDisabled) {
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

          if (option && !option.disabled) {
            handleSelect(option);
          }
        }

        break;

      case "Escape":
        event.preventDefault();
        setOpen(false);
        break;

      default:
        if (event.key.length === 1 && open) {
          findOptionByKey(event.key);
        }
    }
  };

  const iconColor = isDisabled
    ? themeState.grayColor
    : isFocused
      ? themeState.primaryColor
      : themeState.blackColor;

  const listboxId = "filter-select-filter-listbox";

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
        }}
        trigger={
          <div
            ref={selectRef}
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
            onFocus={() => {
              if (!isDisabled) {
                setIsFocused(true);
              }
            }}
            onBlur={() => {
              setIsFocused(false);
              onBlur?.(value);
            }}
            onClick={() => {
              if (isDisabled && readOnly) return;
              setOpen(true);
            }}
            onKeyDown={handleKeyDown}
          >
            {svg && <Icon name={svg} size={16} color={iconColor} />}
            {loading && <Loader size="s" text={true} />}
            {!loading && apiError && <ErrorMessage>{apiError}</ErrorMessage>}
            {!loading && !apiError && (
              <>
                <input
                  id="filter-select-filter-input"
                  type="text"
                  value={selectedOption?.label ?? ""}
                  placeholder={placeholder}
                  disabled={isDisabled}
                  readOnly
                  tabIndex={-1}
                />

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();

                    if (!isDisabled && !readOnly) {
                      setOpen((current) => !current);
                    }
                  }}
                  disabled={isDisabled}
                  className="filter-select__button"
                  tabIndex={-1}
                >
                  <Icon
                    name={open ? "CaretUp" : "CaretDown"}
                    size={16}
                    color={iconColor}
                  />
                </button>
              </>
            )}
          </div>
        }
      >
        <div className="filter-select__options" id={listboxId} role="listbox">
          {options.map((option, index) => {
            const isSelected = isEqual(selectedOption?.value, option.value);

            return (
              <button
                key={index}
                id={`${listboxId}-option-${index}`}
                type="button"
                role="option"
                aria-selected={isSelected}
                disabled={option.disabled}
                className={`filter-select__option ${
                  isSelected ? "filter-select__selected" : ""
                } ${highlightedIndex === index ? "filter-select__highlighted" : ""}`}
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
        </div>
      </InputDropdown>
    </div>
  );
};

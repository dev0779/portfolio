import { useTheme } from "@/hooks";
import { Icon } from "@/shared/Icons/Icon";
import { IconTooltip } from "@/shared/Tooltip/IconTooltip/IconTooltip";
import { useMemo, type JSX } from "react";

import "./Checkbox.scss";

interface FilterCheckboxProps {
  name?: string;
  label: string;
  info?: string;
  disabled?: boolean;
  readOnly?: boolean;
  checked?: boolean;
  interactive?: boolean;
  tooltipChildren?: React.ReactNode;
  onChange?: (checked: boolean) => void;
}

export const FilterCheckbox = ({
  name,
  label,
  info,
  disabled = false,
  readOnly = false,
  checked = false,
  interactive,
  tooltipChildren,
  onChange,
}: FilterCheckboxProps): JSX.Element => {
  const { themeState } = useTheme();

  const labelToRender = useMemo(() => {
    if (!label) return null;

    return <p>{label}</p>;
  }, [label]);

  const iconColor = disabled ? themeState.grayColor : themeState.blackColor;

  return (
    <div className="checkbox">
      <div className="checkbox__wrapper">
        <input
          id={name}
          type="checkbox"
          disabled={disabled}
          readOnly={readOnly}
          checked={checked}
          onChange={(event) => onChange?.(event.target.checked)}
        />

        <label htmlFor={name} className="checkbox__box">
          <Icon
            name={checked ? "CheckSquare" : "Square"}
            size={20}
            weight={checked ? "fill" : "regular"}
            color={iconColor}
          />

          <span>
            {labelToRender}

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
          </span>
        </label>
      </div>
    </div>
  );
};

import { useTheme } from "@/hooks";
import { Icon } from "@/shared/Icons/Icon";
import { useMemo, useRef, type JSX } from "react";
import { useFormContext } from "react-hook-form";
import "./Checkbox.scss";
import Tippy from "@tippyjs/react";

interface CheckboxProps {
  name: string;
  label: string;
  info?: string;
  required?: string;
  disabled?: boolean;
  readOnly?: boolean;
  hideError?: boolean;
  value?: string;
}

export const Checkbox = ({
  name,
  label,
  info,
  value,
  required,
  disabled,
  readOnly,
}: CheckboxProps): JSX.Element => {
  const { themeState } = useTheme();
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const checkboxRef = useRef<HTMLInputElement | null>(null);

  const { ref, ...rest } = register(name, { required });

  const checked = watch(name);

  const labelToRender = useMemo(() => {
    if (label) {
      if (typeof label === "string") {
        return <p>{required ? `${label} *` : label}</p>;
      } else {
        return required ? <>{label} * </> : label;
      }
    } else {
      return null;
    }
  }, [label, required]);

  const iconColor = errors[name]
    ? themeState.errorColor
    : disabled
      ? themeState.grayColor
      : checkboxRef.current === document.activeElement
        ? themeState.primaryColor
        : themeState.blackColor;

  return (
    <div className="checkbox">
      <div className="checkbox__wrapper">
        <input
          id={name}
          type="checkbox"
          disabled={disabled}
          readOnly={readOnly}
          value={value && value}
          {...rest}
          ref={(e) => {
            ref(e);
            checkboxRef.current = e;
          }}
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
                <Tippy content={info}>
                  <span className="checkbox__info">
                    <Icon name="Info" color="blue" weight="fill" size={16} />
                  </span>
                </Tippy>
              )}
          </span>
        </label>
      </div>
      {errors[name] && <span className="checkbox__error">{errors[name]?.message?.toString()}</span>}
    </div>
  );
};

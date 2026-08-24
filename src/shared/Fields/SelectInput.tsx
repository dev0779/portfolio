import React, { useRef, useEffect, useState } from "react";
import { useController, useFormContext, type Control } from "react-hook-form";
import tippy, { type Instance } from "tippy.js";

import { Icon } from "../Icons/Icon";
import "./fields-styled/fields.scss";

interface Option {
  label: string;
  value: string | number;
}

interface TooltipSelectInputProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  options: Option[];
  placeholder?: string;
  label: string;
}

export const SelectInput = ({
  name,
  label,
  options,
  placeholder,
}: TooltipSelectInputProps) => {
  const { control } = useFormContext(); // grab control from context
  const { field } = useController({ name, control });
  const inputRef = useRef<HTMLInputElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const tippyInstance = useRef<Instance>(null);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (inputRef.current && optionsRef.current && !tippyInstance.current) {
      tippyInstance.current = tippy(inputRef.current, {
        content: optionsRef.current,
        allowHTML: true,
        interactive: true,
        trigger: "click",
        placement: "bottom-start",
        hideOnClick: true,
        arrow: false,
        theme: "select",
        appendTo: "body",
        offset: [0, 5],
        onShow: () => {
          if (tippyInstance.current && inputRef.current) {
            const width = inputRef.current.offsetWidth;
            tippyInstance.current.popper.style.width = `${width}px`;
          }
        },
        onHide: () => {},
      });
    }

    if (tippyInstance.current) {
      if (open) tippyInstance.current.show();
      else tippyInstance.current.hide();
    }
  }, [open]);

  return (
    <>
      <div
        className="select"
        ref={inputRef}
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        <label>{label}</label>
        <input
          {...field}
          value={options.find((opt) => opt.value === field.value)?.label ?? ""}
          placeholder={placeholder}
          className="border p-2 rounded w-64 cursor-pointer"
          readOnly
        />
        <Icon name={open ? "CaretUp" : "CaretDown"} size={20} color="black" />
      </div>
      <div ref={optionsRef} className="select__options">
        {options.map((opt) => (
          <div
            className="select__option"
            key={opt.value}
            onClick={(e) => {
              e.stopPropagation();
              field.onChange(opt.value);
              setOpen(false);
            }}
          >
            {opt.label}
          </div>
        ))}
      </div>
    </>
  );
};

import React, { useRef, useEffect, useState } from 'react';
import { useController, Control } from 'react-hook-form';
import tippy, { Instance } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import { Icon } from '../Icons/Icon';

interface Option {
  label: string;
  value: string;
}

interface TooltipSelectInputProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  options: Option[];
  placeholder?: string;
  label: string;
}

export const SelectInput = ({ name, label, control, options, placeholder }: TooltipSelectInputProps) => {
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
        trigger: 'manual',
        placement: 'bottom-start',
        onShow: () => {},
        onHide:() => {},
      });
    }

    if (tippyInstance.current) {
      if (open) tippyInstance.current.show();
      else tippyInstance.current.hide();
    }
  }, [open]);

  return (
    <>
      <div>
      <label>{label}</label>
      <input
        {...field}
        ref={inputRef}
        placeholder={placeholder}
        className="border p-2 rounded w-64 cursor-pointer"
        readOnly
        onClick={() => setOpen((prev) => !prev)}
        />
        <Icon name={open ? 'ArrowUp' : 'ArrowDown'} size={10} color="black" />
      </div>
      <div ref={optionsRef} className="flex flex-col gap-1">
        {options.map((opt) => (
          <div
            key={opt.value}
            className="p-2 cursor-pointer hover:bg-gray-100"
            onClick={() => {
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
}

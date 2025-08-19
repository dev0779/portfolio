import { useRef, type JSX } from "react";
import { useFormContext, type RegisterOptions } from "react-hook-form";

interface TextInputProps {
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  readOnly?: boolean;
  defaultValue?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  validate?: RegisterOptions['validate'];
  required?: boolean | string;
  type?: string;
  error?: string;
}

export const TextInput = ({
  name,
  required,
  label,
  placeholder,
  validate,
  onChange,
  onBlur,
  disabled,
  readOnly,
  defaultValue,
  type,
  loading,
}: TextInputProps): JSX.Element => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

    const textInputRef = useRef<HTMLInputElement | null>(null);
    
  const { ref, ...rest } = register(name, {
    required,
    validate,
    onChange,
    onBlur,
  });

  return (
    <div>
      <div>
        <label htmlFor={name}>{required ? `${label}*` : label}</label>
        <div>
          <input
            id={name}
            type={type || "text"}
            disabled={disabled}
            placeholder={placeholder}
            readOnly={readOnly}
            defaultValue={defaultValue}
            ref={(e) => {
              ref(e);
              textInputRef.current = e;
            }}
            {...rest}
          />
          {}
          {loading && <span>loading...</span>}
        </div>
        {errors?.[name] && <span>{errors[name]?.message?.toString()}</span>}
      </div>
    </div>
  );
};

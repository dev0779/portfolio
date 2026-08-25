import {
  Controller,
  type FieldValues,
  type Path,
  useFormContext,
} from 'react-hook-form';

import './Select.scss';

export type SelectValue = string | number;

export type SelectOption<
  TValue extends SelectValue = string,
> = {
  label: string;
  value: TValue;
  disabled?: boolean;
};

type SelectProps<
  TFieldValues extends FieldValues,
  TValue extends SelectValue = string,
> = {
  name: Path<TFieldValues>;
  options: SelectOption<TValue>[];
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
};

export const Select = <
  TFieldValues extends FieldValues,
  TValue extends SelectValue = string,
>({
  name,
  options,
  label,
  placeholder = 'Select an option',
  required = false,
  disabled = false,
}: SelectProps<TFieldValues, TValue>) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required
          ? 'Please select an option'
          : false,
      }}
      render={({ field, fieldState }) => (
        <div
          className={`select ${
            fieldState.error
              ? 'select--error'
              : ''
          } ${
            disabled
              ? 'select--disabled'
              : ''
          }`}
        >
          {label && (
            <div className="select__label">
              {label}

              {required && (
                <span className="select__required">
                  *
                </span>
              )}
            </div>
          )}

          <div className="select__wrapper">
            <select
              name={field.name}
              ref={field.ref}
              disabled={disabled}
              value={field.value ?? ''}
              onBlur={field.onBlur}
              onChange={(event) => {
                const selectedOption =
                  options.find(
                    (option) =>
                      String(option.value) ===
                      event.target.value,
                  );

                field.onChange(
                  selectedOption?.value ?? '',
                );
              }}
            >
              <option
                value=""
                disabled
              >
                {placeholder}
              </option>

              {options.map((option) => (
                <option
                  key={String(option.value)}
                  value={String(option.value)}
                  disabled={option.disabled}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {fieldState.error && (
            <span className="select__error">
              {fieldState.error.message}
            </span>
          )}
        </div>
      )}
    />
  );
};
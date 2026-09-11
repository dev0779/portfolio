import { useRef, type JSX } from "react";
import { Controller, useFormContext } from "react-hook-form";
import SignatureCanvas from "react-signature-canvas";

import { ErrorMessage } from "../fields-styled/Fields.styled";
import { IconButton } from "@/shared/Buttons/IconButton/IconButton";

import "./../Fields.scss";
import { requiredErrorMessage } from "@/utils/errors";
interface SignatureInputProps {
  name: string;
  label: string;
  required?: boolean;
  height?: number;
  onChange?: (signature: string) => void;
  onBlur?: (signature?: string) => void;
}

export const SignatureInput = ({
  name,
  label,
  required,
  height = 180,
  onChange,
  onBlur,
}: SignatureInputProps): JSX.Element => {
  const { control } = useFormContext();

  const signatureRef = useRef<SignatureCanvas | null>(null);

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? requiredErrorMessage : false }}
      render={({ field, fieldState }) => (
        <div className="field-input">
          <label className="field-input__label" htmlFor={name}>
            {required ? `${label} *` : label}
          </label>

          <div className="field-input__wrapper">
            <div className="field-input__actions">
              <IconButton
                label="clear signature"
                size="xs"
                variant="secondary"
                icon="Trash"
                onClick={() => {
                  signatureRef.current?.clear();
                  field.onChange();
                  onChange?.("");
                  onBlur?.("");
                }}
              />
              {/*               <button
                type="button"
                className="signature-input__clear"
                onClick={() => {
                  signatureRef.current?.clear();
                  field.onChange();
                  onChange?.("");
                  onBlur?.("");
                }}
              >
                Clear
              </button> */}
            </div>
            <SignatureCanvas
              ref={signatureRef}
              canvasProps={{
                className: "field-input__canvas",
                style: {
                  height: `${height}px`,
                },
              }}
              onEnd={() => {
                if (!signatureRef.current) return;

                const signature = signatureRef.current.toDataURL();

                field.onChange(signature);
                field.onBlur();
                onChange?.(signature);
                onBlur?.(signature);
              }}
            />
          </div>
          {fieldState.error && (
            <ErrorMessage>{fieldState.error.message}</ErrorMessage>
          )}
        </div>
      )}
    />
  );
};

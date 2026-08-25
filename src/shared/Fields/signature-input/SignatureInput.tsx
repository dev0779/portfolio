import { useRef, type JSX } from "react";
import { Controller, useFormContext } from "react-hook-form";
import SignatureCanvas from "react-signature-canvas";

import "./SignatureInput.scss";

interface SignatureInputProps {
  name: string;
  label: string;
  required?: boolean;
  height?: number;
}

export const SignatureInput = ({
  name,
  label,
  required,
  height = 180,
}: SignatureInputProps): JSX.Element => {
  const { control } = useFormContext();

  const signatureRef = useRef<SignatureCanvas | null>(null);

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={({ field, fieldState }) => (
        <div className="signature-input">
          <label className="signature-input__label" htmlFor={name}>
            {required ? `${label} *` : label}
          </label>

          <div className="signature-input__wrapper">
            <div className="signature-input__actions">
              {/*  // todo  add theme button */}
              <button
                type="button"
                className="signature-input__clear"
                onClick={() => {
                  signatureRef.current?.clear();
                  field.onChange("");
                }}
              >
                Clear
              </button>
            </div>
            <SignatureCanvas
              ref={signatureRef}
              canvasProps={{
                className: "signature-input__canvas",
                style: {
                  height: `${height}px`,
                },
              }}
              onEnd={() => {
                if (!signatureRef.current) return;

                const signature = signatureRef.current.toDataURL();

                field.onChange(signature);
              }}
            />
          </div>
          {fieldState.error && (
            <span className="signature-input__error">
              {fieldState.error.message}
            </span>
          )}
        </div>
      )}
    />
  );
};

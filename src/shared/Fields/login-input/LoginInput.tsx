import { useRef, useState, type JSX } from "react";
import { useFormContext, type RegisterOptions } from "react-hook-form";
import {
  ErrorMessage,
  IconCol,
  InputWrapper,
  Label,
  MainCol,
  StyledInput,
} from "../fields-styled/Fields.styled";

import * as PhosphorIcons from "phosphor-react";
import { Icon } from "../../Icons/Icon";
import { useTheme } from "@/hooks";

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
  validate?: RegisterOptions["validate"];
  required?: boolean | string;
  type?: string;
  error?: string;
  svg?: keyof typeof PhosphorIcons;
}

export const LoginInput = ({
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
  svg,
}: TextInputProps): JSX.Element => {
  const { themeState } = useTheme();

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const textInputRef = useRef<HTMLInputElement | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { ref, ...rest } = register(name, {
    required,
    validate,
    onChange,
    onBlur,
  });

  const iconColor = errors[name]
    ? themeState.errorColor
    : disabled
      ? themeState.grayColor
      : textInputRef.current === document.activeElement
        ? themeState.primaryColor
        : themeState.blackColor;

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <>
      <InputWrapper disabled={disabled}>
        {type === "password" && (
          <IconCol
            clickable={isPassword}
            onClick={
              isPassword ? () => setShowPassword(!showPassword) : undefined
            }
          >
            <Icon
              name={showPassword ? "Eye" : "EyeSlash"}
              size={18}
              color={iconColor}
            />
          </IconCol>
        )}
        {type !== "password" && (
          <IconCol>
            <Icon name={svg || "User"} size={16} color={iconColor} />
          </IconCol>
        )}
        <MainCol>
          <Label htmlFor={name}>{required ? `${label}*` : label}</Label>
          <StyledInput
            id={name}
            type={inputType}
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
          {loading && <span>loading...</span>}
        </MainCol>
      </InputWrapper>
      {errors?.[name] && (
        <ErrorMessage>{errors[name]?.message?.toString()}</ErrorMessage>
      )}
    </>
  );
};

import styled from "styled-components";

export const InputWrapper = styled.div<{ disabled?: boolean; error?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid
    ${({ theme, error }) => (error ? theme.errorColor : theme.grayColor)};
  border-radius: 10px;
  padding: 0.2rem 0.4rem;
  margin-bottom: 0.75rem;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "text")};

  &:focus-within {
    border-color: ${({ theme }) => theme.primaryColor};
  }

  &:hover {
    border-color: ${({ theme }) => theme.primaryColor};
  }

  ${({ disabled, theme }) =>
    disabled && `background-color: ${theme.grayColor}`};
`;

export const IconCol = styled.div<{ clickable?: boolean }>`
  width: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  transition: background-color 0.2s ease;
  cursor: ${({ clickable }) => (clickable ? "pointer" : "default")};

  &:hover {
    background-color: ${({ clickable, theme }) =>
      clickable ? theme.grayColor : "transparent"};
  }

  ${InputWrapper}:focus-within & {
    color: ${({ theme }) => theme.primaryColor};
  }
`;

export const MainCol = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: 0.7rem;
  font-weight: 400;
  margin-bottom: 0.25rem;
  color: ${({ theme }) => theme.grayColor};
`;

export const StyledInput = styled.input`
  border: none;
  outline: none;
  flex: 1;
  font-size: 1rem;
  background: transparent;

  &::placeholder {
    color: ${({ theme }) => theme.grayColor};
    opacity: 0.7;
  }
`;

export const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.errorColor};
  font-size: 0.75rem;
  margin-top: 0.25rem;
  min-height: 1em;
`;

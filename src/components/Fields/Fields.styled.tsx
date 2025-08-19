import styled from "styled-components";

export const InputWrapper = styled.div<{required?: boolean , error?:boolean}>`
position:relative;
display:flex;
align-items: center;
border:1px solid ${({ theme, error }) => (error ? theme.errorColor : theme.grayColor)};
border-radius: 6px;
padding: 0.5rem;

  &:focus-within {
    border-color: ${({ theme }) => theme.primaryColor};
  };

  &:hover{
     border-color: ${({ theme }) => theme.primaryColor};
  };
  
  ${({ required, theme }) =>
        required && `background-color: ${ theme.grayColor }` }
  
`;

export const IconCol = styled.div`
  width: 2.5rem; // adjust as needed
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MainCol = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
`;

export const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.errorColor};
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;
import styled from "styled-components";

export const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.errorColor};
  font-size: 0.75rem;
  margin-top: 0.25rem;
  padding-left: 0.5rem;
  min-height: 1em;
`;

export const Dropdown = styled.div`
  background-color: ${({ theme }) => theme.whiteColor};
  border-radius: 8px;
  width: 100%;
  height: 100%;
  overflow: auto;
`;

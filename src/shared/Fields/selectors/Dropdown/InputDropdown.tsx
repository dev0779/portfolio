import React, { useEffect, useRef, type JSX } from "react";
import styled from "styled-components";

interface DropdownProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Content = styled.div`
  position: absolute;
  top: calc(100% + 0px);
  left: 0;
  width: 100%;
  max-height: 300px;
  background: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.primaryColor};
  border-radius: 4px;
  z-index: 10000;
  overflow: hidden;
  padding: 0.3rem;
  display: flex;
  flex-direction: column;
`;

export const InputDropdown = ({
  open,
  onOpenChange,
  children,
}: DropdownProps): JSX.Element => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        onOpenChange(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onOpenChange]);

  return (
    <Wrapper ref={wrapperRef}>{open && <Content>{children}</Content>}</Wrapper>
  );
};

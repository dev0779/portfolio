import * as DialogPrimitive from "@radix-ui/react-dialog";
import styled from "styled-components";
import React, { useEffect, type RefObject } from "react";

// Styled Overlay
const Overlay = styled(DialogPrimitive.Overlay)`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(2px);
`;

// Styled Content with flexible sizing
interface ContentProps {
  width?: string;
  height?: string;
}

const Content = styled(DialogPrimitive.Content)<ContentProps>`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border-radius: 0.5rem;
  padding: 2rem;
  max-width: ${({ width }) => width || "500px"};
  max-height: ${({ height }) => height || "80vh"};
  margin: auto;
  position: relative;
  overflow-y: auto;
  transition: all 0.3s ease;
`;

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  closeOnOverlayClick?: boolean;
  preventClose?: boolean;
  width?: string;
  height?: string;
  initialFocusRef?: RefObject<HTMLElement>;
  finalFocusRef?: RefObject<HTMLElement>;
}

export function Dialog({
  open,
  onOpenChange,
  children,
  closeOnOverlayClick = true,
  preventClose = false,
  width,
  height,
  initialFocusRef,
  finalFocusRef,
}: DialogProps) {

  // Handle initial focus when dialog opens
  useEffect(() => {
    if (open && initialFocusRef?.current) {
      initialFocusRef.current.focus();
    }
  }, [open, initialFocusRef]);

  // Handle final focus when dialog closes
  useEffect(() => {
    if (!open && finalFocusRef?.current) {
      finalFocusRef.current.focus();
    }
  }, [open, finalFocusRef]);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(val) => {
      if (!preventClose) onOpenChange(val);
    }}>
      <DialogPrimitive.Portal>
        <Overlay
          onClick={() => {
            if (!preventClose && closeOnOverlayClick) onOpenChange(false);
          }}
        />
        <Content width={width} height={height}>
          {children}
        </Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

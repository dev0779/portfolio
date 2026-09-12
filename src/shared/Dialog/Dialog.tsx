import * as DialogPrimitive from "@radix-ui/react-dialog";
import styled from "styled-components";
import React, { useEffect, type RefObject } from "react";

// Styled Overlay
const Overlay = styled(DialogPrimitive.Overlay)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
  z-index:10000;
`;

// Styled Content with flexible sizing
interface ContentProps {
  width?: string;
  height?: string;
}

const Content = styled(DialogPrimitive.Content)<ContentProps>`
  //background: ${({ theme }) => theme.background};
  background: white;
  //color: ${({ theme }) => theme.text};
  color: black;
  border-radius: 0.5rem;
  padding: 2rem;

  width: ${({ width }) => width || "500px"};
  height: ${({ height }) => height || "80vh"};

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index:10001;
  overflow-y: auto;
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
  width = "100%",
  height = "100%",
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
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(val) => {
        if (!preventClose) onOpenChange(val);
      }}
    >
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

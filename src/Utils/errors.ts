import type {  FieldError } from "react-hook-form";

export const requiredErrorMessage = "required field"


export const scrollToFirstError = (errors?: Record<string, unknown>) => {
  if (!errors || typeof errors !== "object") return;

  setTimeout(() => {
    let element: HTMLElement | null = document.querySelector(".is-invalid");

    if (!element) {
      const keys = Object.keys(errors);
      if (keys.length === 0) return;

      const firstErrorKey = keys[0];
      const firstError = errors[firstErrorKey] as FieldError | undefined;

      if (firstError?.ref instanceof HTMLElement) {
        element = firstError.ref;
      } else if (firstError?.ref?.parentNode instanceof HTMLElement) {
        element = firstError.ref.parentNode;
      } else {
        element = null;
      }
    }

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      element.focus?.();
    }
  }, 100);
};




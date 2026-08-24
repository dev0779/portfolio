import React, { useEffect, useRef, type ReactNode } from "react";
import tippy, { type Props } from "tippy.js";
import "tippy.js/dist/tippy.css";

interface TooltipProviderProps {
  children: React.ReactNode;
}

// Extend Props to include optional 'lazy'
interface ExtendedProps extends Props {
  lazy?: boolean;
}

export function TooltipProvider({ children }: TooltipProviderProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const attachTooltips = () => {
      const elements = rootRef.current!.querySelectorAll<HTMLElement>(
        "[tooltip], [tooltipcontent]"
      );
      elements.forEach((el) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (!(el as any)._tippy) {
          let content: string | ReactNode = el.getAttribute("tooltip") || "";

          // Check if tooltipContent prop exists
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if ((el as any)._tooltipContent) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            content = (el as any)._tooltipContent;
          }

          const optionsAttr = el.getAttribute("options");
          let options: Partial<ExtendedProps> = {};
          if (optionsAttr) {
            try {
              options = JSON.parse(optionsAttr);
              // eslint-disable-next-line no-empty
            } catch (error) {
              console.log("tooltip error", error);
            }
          }

          tippy(el, {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            content: content as any,
            allowHTML: true,
            theme: "contrast-box",
            arrow: false,
            ...options,
          });
        }
      });
    };

    // Initial scan
    attachTooltips();

    // Observe for new elements dynamically added
    const observer = new MutationObserver(() => attachTooltips());
    observer.observe(rootRef.current, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return <div ref={rootRef}>{children}</div>;
}

import { useRef, useState } from "react";

type SelectNavigationOption = {
  disabled?: boolean;
};

type UseSelectNavigationProps<T> = {
  options: T[];
};

export const useSelectNavigation = <
  T extends SelectNavigationOption,
>({
  options,
}: UseSelectNavigationProps<T>) => {
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const optionRefs = useRef<
    Record<number, HTMLButtonElement | null>
  >({});

  const moveDown = () => {
    setHighlightedIndex(currentIndex => {
      let nextIndex = currentIndex + 1;
      while (
        nextIndex < options.length &&
        options[nextIndex].disabled
      ) {
        nextIndex++;
      }

      return nextIndex < options.length
        ? nextIndex
        : currentIndex;
    });
  };

  const moveUp = () => {
    setHighlightedIndex(currentIndex => {
      let nextIndex = currentIndex - 1;

      while (
        nextIndex >= 0 &&
        options[nextIndex].disabled
      ) {
        nextIndex--;
      }

      return nextIndex >= 0
        ? nextIndex
        : currentIndex;
    });
  };

  return {
    highlightedIndex,
    setHighlightedIndex,
    moveDown,
    moveUp,
    optionRefs,
  };
};
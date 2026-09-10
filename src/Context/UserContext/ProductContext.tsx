import {
  createContext,
  useState,
  type PropsWithChildren,
  type Dispatch,
  type SetStateAction,
} from "react";

interface ProductContextProps {
  currentIndex?: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
}

const defaultContext: ProductContextProps = {
  currentIndex: 0,
  setCurrentIndex: () => {},
};

// eslint-disable-next-line react-refresh/only-export-components
export const ProductContext =
  createContext<ProductContextProps>(defaultContext);

export const ProductProvider = ({ children }: PropsWithChildren) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <ProductContext.Provider
      value={{
        currentIndex,
        setCurrentIndex,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

import {
  createContext,
  useState,
  type PropsWithChildren,
  type Dispatch,
  type SetStateAction,
} from "react";


export interface SelectedProduct{
  id?: number;
  name: string;
  price: number;
  description: string;
  type: "company" | "private"
  features: string[]
}


interface ProductContextProps {
  currentIndex?: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  selectedProduct: SelectedProduct | null;
  setSelectedProduct:  Dispatch<SetStateAction<SelectedProduct | null>>
}



const defaultContext: ProductContextProps = {
  currentIndex: 0,
  setCurrentIndex: () => { },
  selectedProduct: null,
  setSelectedProduct: () => {}
};

// eslint-disable-next-line react-refresh/only-export-components
export const ProductContext =
  createContext<ProductContextProps>(defaultContext);

export const ProductProvider = ({ children }: PropsWithChildren) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedProduct, setSelectedProduct] = useState<SelectedProduct | null>(null);

  return (
    <ProductContext.Provider
      value={{
        currentIndex,
        setCurrentIndex,
        selectedProduct,
        setSelectedProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

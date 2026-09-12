import {
  createContext,
  useState,
  type PropsWithChildren,
  type Dispatch,
  type SetStateAction,
} from "react";

export interface Product {
  id?: number;
  title: string;
  name: string;
  price: number;
  description: string;
  type: "company" | "private";
  features: string[];
}

export type CustomerType = "company" | "private";

interface ProductContextProps {
  currentIndex?: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  selectedProduct: Product | null;
  setSelectedProduct: Dispatch<SetStateAction<Product | null>>;
  selectedCustomerType: CustomerType;
  setSelectedCustomerType: Dispatch<SetStateAction<CustomerType>>;
}

const defaultContext: ProductContextProps = {
  currentIndex: 0,
  selectedProduct: null,
  selectedCustomerType: "private",
  setCurrentIndex: () => {},
  setSelectedProduct: () => {},
  setSelectedCustomerType: () => {},
};

// eslint-disable-next-line react-refresh/only-export-components
export const ProductContext =
  createContext<ProductContextProps>(defaultContext);

export const ProductProvider = ({ children }: PropsWithChildren) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedProduct, setSelectedProduct] =
    useState<SelectedProduct | null>(null);
  const [selectedCustomerType, setSelectedCustomerType] =
    useState<CustomerType>("private");

  return (
    <ProductContext.Provider
      value={{
        currentIndex,
        setCurrentIndex,
        selectedProduct,
        setSelectedProduct,
        selectedCustomerType,
        setSelectedCustomerType,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

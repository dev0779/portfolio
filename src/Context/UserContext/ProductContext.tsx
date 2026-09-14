import type { Icon } from "@/shared/Icons/Icon";
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

export interface CardCalculation {
  users?: number;
  storage?: number;
  support?: string;
  integrations?: string[];
}

export interface StepOption {
  id?: number;
  label?: string;
  name?: string;
  disabled?: boolean;
  icon?: React.ComponentProps<typeof Icon>["name"];
  title?: string;
  description?: string;
  info?: string;
  percentage?: string;
  element?: React.ReactNode;
}

export type CustomerType = "company" | "private";

interface ProductContextProps {
  currentIndex?: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  selectedProduct: Product | null;
  selectedStep: StepOption | null;
  setSelectedProduct: Dispatch<SetStateAction<Product | null>>;
  selectedCustomerType: CustomerType;
  setSelectedCustomerType: Dispatch<SetStateAction<CustomerType>>;
  setSelectedStep: Dispatch<SetStateAction<StepOption | null>>;

  card: CardCalculation;
  updateCard: (updates: Partial<CardCalculation>) => void;
}

const defaultContext: ProductContextProps = {
  currentIndex: 0,
  selectedProduct: null,
  selectedCustomerType: "private",
  selectedStep: null,
  setCurrentIndex: () => {},
  setSelectedProduct: () => {},
  setSelectedCustomerType: () => {},
  setSelectedStep: () => {},
  card: null,
  updateCard: () => {},
};

// eslint-disable-next-line react-refresh/only-export-components
export const ProductContext =
  createContext<ProductContextProps>(defaultContext);

export const ProductProvider = ({ children }: PropsWithChildren) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCustomerType, setSelectedCustomerType] =
    useState<CustomerType>("private");

  const [selectedStep, setSelectedStep] = useState<StepOption | null>(null);

  const [card, setCard] = useState<CardCalculation>({
    users: 0,
    storage: 0,
    support: "standard",
    integrations: [],
  });

  const updateCard = (updates: Partial<CardCalculation>) => {
    setCard((current) => ({
      ...current,
      ...updates,
    }));
  };

  return (
    <ProductContext.Provider
      value={{
        currentIndex,
        setCurrentIndex,
        selectedProduct,
        setSelectedProduct,
        selectedCustomerType,
        setSelectedCustomerType,
        selectedStep,
        setSelectedStep,
        card,
        updateCard,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

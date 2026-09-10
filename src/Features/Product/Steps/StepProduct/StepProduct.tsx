import { Carousel } from "@/shared/Carousel/Carousel";
import { ProductCard } from "@/shared/ProductCard/ProductCard";
import React, { useContext, useState } from "react";
import { productsData } from "./productDefinition";
import { ProductContext } from "@/context/UserContext/ProductContext";

import "./StepProduct.scss";

export const StepProduct = () => {
  const { setSelectedProduct, selectedProduct } = useContext(ProductContext);
  const [productType, setProductType] = useState<string>("private");

  const products = productsData["private"];

  const handleProductSelection = (product) => {
    setSelectedProduct(product);
    console.log("product", product);
  };

  const selectedIndex = selectedProduct
    ? productsData[selectedProduct?.type].findIndex(
        (product) => product.id === selectedProduct.id,
      )
    : 0;

  return (
    <div className="stepProduct">
      <Carousel selectedIndex={selectedIndex >= 0 ? selectedIndex : 0}>
        {products.map((product) => (
          <ProductCard product={product} onClick={handleProductSelection} />
        ))}
      </Carousel>
    </div>
  );
};

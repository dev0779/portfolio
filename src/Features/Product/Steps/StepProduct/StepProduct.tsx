import { Carousel } from "@/shared/Carousel/Carousel";
import { ProductCard } from "@/shared/ProductCard/ProductCard";
import React from "react";
import { productsData } from "./productDefinition";

import "./StepProduct.scss";

export const StepProduct = () => {
  const products = productsData["private"];

  const handleCardSelection = (card) => {};

  return (
    <div className="stepProduct">
      <Carousel>
        {products.map((product) => (
          <ProductCard
            product={product}
            onClick={(card) => handleCardSelection(card)}
          />
        ))}
      </Carousel>
    </div>
  );
};

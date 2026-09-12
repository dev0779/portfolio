import { ProductContext } from "@/context/UserContext/ProductContext";
import { ProductCard } from "@/shared/ProductCard/ProductCard";
import React, { useContext } from "react";

import "./CardCalculation.scss";
import { Icon } from "@/shared/Icons/Icon";


export const CardCalculation = () => {
  const { selectedProduct } = useContext(ProductContext);

  console.log("selectedProduct", selectedProduct);
  return (
    <div className="cardCalculator">
      <ProductCard
        card={true}
        product={selectedProduct ? selectedProduct : null}
      />
      <div className="cardCalculator__details">
        <div className="card__description">{selectedProduct?.description}</div>
        <div className="card__features">
          {selectedProduct?.features.map((feature) => {
            return (
              <div className="card__features__feature">
                <Icon name="PuzzlePiece" size={20} color="red" weight="thin" />
                <span>{feature}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

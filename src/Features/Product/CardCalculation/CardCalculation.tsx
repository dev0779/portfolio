import { ProductContext } from "@/context/UserContext/ProductContext";
import { ProductCard } from "@/shared/ProductCard/ProductCard";
import React, { useContext } from "react";

import "./CardCalculation.scss";
import { Icon } from "@/shared/Icons/Icon";

export const CardCalculation = () => {
  const { selectedProduct, card } = useContext(ProductContext);

  return (
    <div className="cardCalculatorContainer">
      <div className="cardCalculator">
        <ProductCard
          card={true}
          product={selectedProduct ? selectedProduct : null}
        />
        <div className="cardCalculator__details">
          <div className="card__description">
            {selectedProduct?.description}
          </div>
          <div className="card__features">
            {selectedProduct?.features.map((feature) => {
              return (
                <div className="card__features__feature">
                  <Icon
                    name="PuzzlePiece"
                    size={20}
                    color="red"
                    weight="thin"
                  />
                  <span>{feature}</span>
                </div>
              );
            })}
          </div>
          <div className="cardCalculator__total">
            <div className="cardCalculator__strongLabel">total: {selectedProduct?.price ?? 0 } euros / monthly</div>
          </div>
          {card && (
            <div className="cardCalculator__add">
              <div>Extras:</div>
              <div>
                <span>Users</span>
                <span>{card.users}</span>
              </div>

              <div>
                <span>Storage</span>
                <span>{card.storage} GB</span>
              </div>

              <div>
                <span>Support</span>
                <span>{card.support}</span>
              </div>

              <div>
                <span>Integrations</span>
                <span>{card.integrations.length}</span>
              </div>
            </div>
          )}

          <div className="cardCalculator__finalPrice">
             total with add
          </div>
        </div>
      </div>
    </div>
  );
};

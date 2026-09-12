import React from "react";
import { Icon } from "../Icons/Icon";

import "./ProductCard.scss";
import type { Product } from "@/context/UserContext/ProductContext";

interface ProductCardProps {
  product?: Product;
  onClick?: (product: Product) => void;
  card?: boolean;
}

export const ProductCard = ({ product, onClick, card }: ProductCardProps) => {
  if (product === null) {
    return (
      <div className="emptyCard">
        <div className="emptyCard__wrapper">
          <div className="emptyCard__hero">
            <div className="emptyCard__title">XXX</div>
            <div className="emptyCard__heroInfo">
              <div className="emptyCard__subtitle"> xxx </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (product !== null && card) {
    return (
      <div className="compactCard">
        <div className="compactCard__wrapper">
          <div className="compactCard__hero">
            <div className="compactCard__title">{product?.title}</div>
            <div className="compactCard__heroInfo">
              <div className="compactCard__subtitle">{product?.name}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="productCard" onClick={() => product && onClick?.(product)}>
      <div className="productCard__wrapper">
        <div className="productCard__hero">
          <div className="productCard__title">{product?.title}</div>

          <div className="productCard__heroInfo">
            <div className="productCard__subtitle">{product?.name}</div>
            <div className="productCard__price">
              {product?.price} euros / Month
            </div>
          </div>
        </div>
        <div className="productCard__info">
          <div className="productCard__info__title">{product?.name}</div>
          <div className="productCard__description">{product?.description}</div>
          <div className="productCard__features">
            {product?.features.map((feature) => {
              return (
                <div className="productCard__features__feature">
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
        </div>
      </div>
    </div>
  );
};

import React from "react";
import { Icon } from "../Icons/Icon";

import "./ProductCard.scss";

interface Product {
  id?: number;
  titel?: string;
  price?: number;
  description?: string;
}

interface ProductCardProps {
  product?: Product;
  onClick?: (product: Product) => void;
}

export const ProductCard = ({ product, onClick }) => {
  return (
    <div className="productCard" onClick={() => product && onClick?.(product)}>
      <div className="productCard__wrapper">
        <div className="productCard__hero">
          <div className="productCard__title">{product?.title}</div>

          <div className="productCard__heroInfo">
            <div className="productCard__subtitle">{product?.name}</div>
            <div className="productCard__price">{product?.price} euros / Month</div>
          </div>
        </div>
        <div className="productCard__info">
          <div className="productCard__info__title">{product?.name}</div>
          <div className="productCard__description">{product?.description}</div>
          <div className="productCard__features">
            {product?.features.map((feature) => {
              return (
                <div className="productCard__features__feature">
                  <Icon name="PuzzlePiece" size={20} color="red"  weight="thin"/>
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

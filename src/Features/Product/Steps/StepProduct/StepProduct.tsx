import { Carousel } from "@/shared/Carousel/Carousel";
import { ProductCard } from "@/shared/ProductCard/ProductCard";
import React, { useContext, useEffect, useState } from "react";
import { productsData } from "./productDefinition";
import { ProductContext } from "@/context/UserContext/ProductContext";

import "./StepProduct.scss";
import { PackageTable } from "@/shared/PackageTable/PackgeTable";
import { MainButton } from "@/shared/Buttons";
import { Switch } from "@/shared/Switch/Switch";

export const StepProduct = () => {
  const {
    setSelectedProduct,
    selectedProduct,
    selectedCustomerType,
    setSelectedCustomerType,
    setCurrentIndex,
  } = useContext(ProductContext);

  const [viewTable, setViewTable] = useState(false);

  const products = productsData[selectedCustomerType];

  const handleProductSelection = (product) => {
    setSelectedProduct(product);
    setCurrentIndex(1);

    console.log("product", product);
  };

  const handleCustomerType = (checked) => {
    setSelectedCustomerType(checked ? "company" : "private");
  };

  const selectedIndex = selectedProduct
    ? productsData[selectedProduct?.type].findIndex(
        (product) => product.id === selectedProduct.id,
      )
    : 0;

  return (
    <div className="stepProduct__wrapper">
      <div className="stepProduct__inner">
        <div className="stepProduct__nav">
          <MainButton
            variant={viewTable ? "secondary" : "primary"}
            size="s"
            label={viewTable ? "view card" : "view table"}
            onClick={() => setViewTable(!viewTable)}
          />
          <Switch
            labels={["private", "company"]}
            checked={selectedCustomerType === "company"}
            onCheckedChange={(checked) => handleCustomerType(checked)}
          />
        </div>

        <div className="stepProduct">
          <Carousel selectedIndex={selectedIndex >= 0 ? selectedIndex : 0}>
            {products.map((product) => (
              <ProductCard product={product} onClick={handleProductSelection} />
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

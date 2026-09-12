import { WizardNav } from "@/shared/Wizards/WizardNav/WizardNav";
import React, { useContext } from "react";
import "./Product.scss";
import { productSteps } from "./productSteps";
import { Container } from "@/theme/layout/Container/Container";
import { FormProvider, useForm } from "react-hook-form";
import { MainButton } from "@/shared/Buttons";

import { ProductContext } from "@/context/UserContext/ProductContext";
import { CardCalculation } from "./CardCalculation/CardCalculation";

interface ProductForm {}

export const Product = () => {
  const { currentIndex, setCurrentIndex } = useContext(ProductContext);

  const form = useForm<ProductForm>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldUnregister: false,
  });

  const { handleSubmit, trigger } = form;

  const submit = (data: ProductForm) => {
    console.log("data", data);
  };

  const handleNext = async () => {
    const valid = await trigger();

    if (!valid) return;

    if (currentIndex === productSteps.length - 1) {
      handleSubmit(submit)();
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex === 0) return;

    setCurrentIndex(currentIndex - 1);
  };

  const isFirstStep = currentIndex === 0;

  return (
    <div className="product">
      <FormProvider {...form}>
        <div className="product__nav">
          <div className="product__nav__wrapper">
            <WizardNav
              steps={productSteps}
              activeIndex={currentIndex}
              onClick={(index) => setCurrentIndex(index)}
            />
          </div>
        </div>

        <Container>
          <div
            className={`product__layout ${
              isFirstStep ? "product__layout--full" : ""
            }`}
          >
            {!isFirstStep && (
              <aside className="product__aside">
                <span>to do</span>
              </aside>
            )}

            <div className="product__form">
              {productSteps[currentIndex].element}

              {!isFirstStep && (
                <div className="product__footer">
                  <MainButton
                    type="button"
                    label="back"
                    variant="secondary"
                    size="m"
                    disabled={currentIndex === 0}
                    onClick={handlePrev}
                  />

                  <MainButton
                    type="button"
                    label="next"
                    variant="primary"
                    size="m"
                    onClick={handleNext}
                  />
                </div>
              )}
            </div>

            {!isFirstStep && <CardCalculation />}
          </div>
        </Container>
      </FormProvider>
    </div>
  );
};

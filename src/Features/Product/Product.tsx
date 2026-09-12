import { WizardNav } from "@/shared/Wizards/WizardNav/WizardNav";
import React, { useContext } from "react";
import "./Product.scss";
import { productSteps } from "./productSteps";
import { Container } from "@/theme/layout/Container/Container";
import { FormProvider, useForm } from "react-hook-form";
import { MainButton } from "@/shared/Buttons";
import { Col } from "@/theme/layout/Col/Col";
import { Row } from "@/theme/layout/Row/Row";

import { ProductContext } from "@/context/UserContext/ProductContext";
import { CardCalculation } from "./CardCalculation/CardCalculation";

interface ProductForm {}

export const Product = () => {
  const { selectedProduct, currentIndex, setCurrentIndex } =
    useContext(ProductContext);

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
          <Row>
            {currentIndex !== 0 && (
              <Col xs={12} md={2} lg={2}>
                <span>to do </span>
              </Col>
            )}
            {currentIndex !== 0 && (
              <Col xs={12} md={7} xl={7}>
                <div className="product__form">
                  {productSteps[currentIndex].element}
                  {currentIndex > 0 && (
                    <Row>
                      <Col xs={12} md={12} lg={12} xl={12}>
                        <div className="product__footer">
                          <MainButton
                            type="button"
                            label="back"
                            variant="secondary"
                            size="m"
                            disabled={currentIndex < 0}
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
                      </Col>
                    </Row>
                  )}
                </div>
              </Col>
            )}
            {currentIndex == 0 && (
              <Col xs={12} >
                <div className="product__form">
                  {productSteps[currentIndex].element}
                  {currentIndex > 0 && (
                    <Row>
                      <Col xs={12} md={12} lg={12} xl={12}>
                        <div className="product__footer">
                          <MainButton
                            type="button"
                            label="back"
                            variant="secondary"
                            size="m"
                            disabled={currentIndex < 0}
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
                      </Col>
                    </Row>
                  )}
                </div>
              </Col>
            )}
            {currentIndex !== 0 && (
              <Col xs={12} md={3} lg={3}>
                <CardCalculation />
              </Col>
            )}
          </Row>
        </Container>
      </FormProvider>
    </div>
  );
};

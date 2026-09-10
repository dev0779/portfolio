import { WizardNav } from "@/shared/Wizards/WizardNav/WizardNav";
import React, { useState } from "react";
import "./Product.scss";
import { productSteps } from "./productSteps";
import { Container } from "@/theme/layout/Container";
import { FormProvider, useForm } from "react-hook-form";
import { MainButton } from "@/shared/Buttons";
import { Col } from "@/theme/layout/Col";
import { Row } from "@/theme/layout/Row";

interface ProductForm {}

export const Product = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
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
            <WizardNav steps={productSteps} activeIndex={currentIndex} />
          </div>
        </div>
        <Container>
          <Row>
            <Col xs={12}>
              <div className="product__form">
                {productSteps[currentIndex].element}
              </div>
            </Col>
          </Row>
          {currentIndex > 0 && (
            <Row>
              <Col xs={12}>
                <div className="productFooter">
                  <MainButton
                    type="button"
                    label="back"
                    variant="secondary"
                    size="s"
                    disabled={currentIndex < 0}
                    onClick={handlePrev}
                  />
                  <MainButton
                    type="button"
                    label="next"
                    variant="primary"
                    size="s"
                    onClick={handleNext}
                  />
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </FormProvider>
    </div>
  );
};

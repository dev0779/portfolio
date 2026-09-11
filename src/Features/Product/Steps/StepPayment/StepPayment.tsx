import React, { useContext } from "react";

import "./StepPayment.scss";
import { ProductContext } from "@/context/UserContext/ProductContext";
import { Col, Container, Row } from "@/theme/layout";
import {
  EmailInput,
  NumberInput,
  RadioGroupButtons,
  Select,
  TextInput,
} from "@/shared/Fields";
import { useFormContext } from "react-hook-form";
import { FieldSet } from "@/shared/Fields/FieldSet/FieldSet";

export const StepPayment = () => {
  const { selectedCustomerType } = useContext(ProductContext);

  const { watch } = useFormContext();

  const paymentOptions = [
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly" },
  ];

  const paymentMethodOptions = [
    { label: "SEPA", value: "sepa" },
    { label: "Bank Transfer", value: "transfer" },
  ];

  const payment = watch("paymentMethod");

  return (
    <Container>
      <FieldSet title="Billing Address">
        <Row>
          <Col xs={12} md={6}>
            <NumberInput name="taxNumber" label="VAT Number / NIF" required />
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <TextInput name="invoiceName" label="Full Name" required />
          </Col>
          <Col xs={8}>
            <TextInput name="address" label="address" required />
          </Col>
          <Col xs={4}>
            <TextInput name="postalCode" label="postalCode" required />
          </Col>
          <Col xs={6}>
            <TextInput name="city" label="city" required />
          </Col>
          <Col xs={6}>
            <TextInput name="country" label="country" required />
          </Col>
          <Col xs={12}>
            <EmailInput name="invoiceEmail" label="Invoice Email" required />
          </Col>
        </Row>
      </FieldSet>

      <FieldSet title="Payment Method">
        <Row>
          <Col xs={12}>
            <Select
              name="paymentFrequency"
              label="Payment Frequency"
              options={paymentOptions}
              required
            />
          </Col>
          <Col xs={12}>
            <RadioGroupButtons
              name="paymentMethod"
              label="Payment Method"
              options={paymentMethodOptions}
              direction="column"
              info="info radio"
              required
            />
          </Col>

          {payment === "sepa" && (
            <Col xs={12}>
              <TextInput name="iban" label="IBAN" />
            </Col>
          )}
        </Row>
      </FieldSet>
    </Container>
  );
};

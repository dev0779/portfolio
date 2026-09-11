import { ProductContext } from "@/context/UserContext/ProductContext";
import {
  EmailInput,
  PasswordInput,
  PhoneNumberInput,
  Select,
  TextInput,
} from "@/shared/Fields";
import { Col } from "@/theme/layout/Col/Col";
import { Row } from "@/theme/layout/Row/Row";
import React, { useContext } from "react";

import "./StepCustomer.scss";
import { Container } from "@/theme/layout/Container/Container";

export const StepCustomer = () => {
  const { selectedCustomerType } = useContext(ProductContext);

  const salutationOptions = [
    { label: "Mr.", value: "Mr." },
    { label: "Ms.", value: "Ms." },
    { label: "Dr.", value: "Dr." },
    { label: "Eng.", value: "Eng." },
    { label: "Other", value: "Other" },
  ];

  return (
    <div className="stepCustomer">
      <Container>
        <div className="formGroupLayout">
          {selectedCustomerType === "private" && (
            <Row>
              <Col xs={12} md={4}>
                <Select
                  name="salutation"
                  label="Salutation"
                  options={salutationOptions}
                />
              </Col>
              <Col xs={12} md={4}>
                <TextInput name="firstName" label="First Name" required />
              </Col>
              <Col xs={12} md={4}>
                <TextInput name="lastName" label="Last Name" required />
              </Col>
              <Col xs={12}>
                <TextInput name="fullName" label="Full Legal Name" required />
              </Col>
              <Col xs={12} md={6}>
                <EmailInput name="email" label="your email" required />
              </Col>
              <Col xs={12} md={6}>
                <PhoneNumberInput
                  name="phoneNumber"
                  label="Phone number"
                  required
                />
              </Col>
            </Row>
          )}

          {selectedCustomerType === "company" && (
            <Row>
              <Col xs={12}>
                <TextInput name="companyName" label="Company Name" required />
              </Col>
              <Col xs={12} md={6}>
                <EmailInput name="email" label="your email" required />
              </Col>
              <Col xs={12} md={6}>
                <PhoneNumberInput
                  name="phoneNumber"
                  label="Phone number"
                  required
                />
              </Col>
            </Row>
          )}
        </div>

        <Row>
          <Col xs={8}>
            <TextInput name="address" label="address" />
          </Col>
          <Col xs={4}>
            <TextInput name="postalCode" label="postalCode" />
          </Col>
          <Col xs={6}>
            <TextInput name="city" label="city" />
          </Col>
          <Col xs={6}>
            <TextInput name="country" label="country" />
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={6}>
            <PasswordInput name="password" label="password" />
          </Col>
          <Col xs={12} md={6}>
            <PasswordInput name="passwordRepeat" label="repeat-password" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

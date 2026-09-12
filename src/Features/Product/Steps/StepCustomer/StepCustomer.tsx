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
import { FieldSet } from "@/shared/Fields/FieldSet/FieldSet";

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
      <FieldSet title="Contact">
        {selectedCustomerType === "private" && (
          <>
            <Row>
              <Col xs={12} md={2} >
                <Select
                  name="salutation"
                  label="Salutation"
                  options={salutationOptions}
                />
              </Col>
            </Row>

            <Row>
              <Col xs={12} md={6}>
                <TextInput
                  name="firstName"
                  label="First Name"
                  required
                />
              </Col>

              <Col xs={12} md={6}>
                <TextInput
                  name="lastName"
                  label="Last Name"
                  required
                />
              </Col>

              <Col xs={12}>
                <TextInput
                  name="fullName"
                  label="Full Legal Name"
                  required
                />
              </Col>

              <Col xs={12} md={6}>
                <EmailInput
                  name="email"
                  label="Your email"
                  required
                />
              </Col>

              <Col xs={12} md={6}>
                <PhoneNumberInput
                  name="phoneNumber"
                  label="Phone number"
                  required
                />
              </Col>
            </Row>
          </>
        )}

        {selectedCustomerType === "company" && (
          <Row>
            <Col xs={12}>
              <TextInput
                name="companyName"
                label="Company Name"
                required
              />
            </Col>

            <Col xs={12} md={6}>
              <EmailInput
                name="email"
                label="Your email"
                required
              />
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
      </FieldSet>

      <FieldSet title="Address">
        <Row>
          <Col xs={12} md={5}>
            <TextInput name="address" label="Address" />
          </Col>

          <Col xs={12} md={4}>
            <TextInput name="postalCode" label="Postal Code" />
          </Col>

          <Col xs={12} md={6}>
            <TextInput name="city" label="City" />
          </Col>

          <Col xs={12} md={6}>
            <TextInput name="country" label="Country" />
          </Col>
        </Row>
      </FieldSet>

      <FieldSet title="Contract password">
        <Row>
          <Col xs={12} md={6}>
            <PasswordInput name="password" label="Password" />
          </Col>

          <Col xs={12} md={6}>
            <PasswordInput
              name="passwordRepeat"
              label="Repeat password"
            />
          </Col>
        </Row>
      </FieldSet>
    </div>
  );
};
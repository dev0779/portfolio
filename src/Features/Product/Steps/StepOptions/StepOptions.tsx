import React, { useContext } from "react";

import "./StepOptions.scss";
import { MultiSelect, NumberStepper, Select } from "@/shared/Fields";
import { FieldSet } from "@/shared/Fields/FieldSet/FieldSet";
import { Col, Row } from "@/theme/layout";
import { ProductContext } from "@/context/UserContext/ProductContext";

export const StepOptions = () => {
  const { updateCard } = useContext(ProductContext);

  const storageOptions = [
    { label: "10 GB", value: 10 },
    { label: "50 GB", value: 50 },
    { label: "100 GB", value: 100 },
    { label: "250 GB", value: 250 },
  ];

  const addOnsOptions = [
    { label: "slack", value: "slack" },
    { label: "salesforce", value: "salesforce" },
    { label: "dashboards", value: "dashboards" },
    {
      label: "microsoftteams",
      value: "microsoftteams",
    },
  ];

  const supportOptions = [
    { label: "Standard", value: "standard" },
    { label: "Priority", value: "priority" },
  ];


  return (
    <div>
      <FieldSet title="Users">
        <Row>
          <Col xs={12}>
            <NumberStepper
              name="users"
              label="add users"
              onChange={(value) => updateCard({ users: value })}
            />
          </Col>
        </Row>
      </FieldSet>

      <FieldSet title="Storage">
        <Row>
          <Col xs={12}>
            <Select
              name="storage"
              label="Storage size"
              options={storageOptions}
              onChange={(value) => updateCard({ storage: value })}
            ></Select>
          </Col>
        </Row>
      </FieldSet>
      <FieldSet title="addOns">
        <Row>
          <Col xs={12}>
            <MultiSelect
              name="integrations"
              label="AddOns"
              options={addOnsOptions}
              onChange={(value) => updateCard({integrations: value})}
            />
          </Col>
        </Row>
      </FieldSet>
      <FieldSet title="Support">
        <Row>
          <Col xs={12}>
            <Select
              name="support"
              label="Support"
              options={supportOptions}
              onChange={(value) => updateCard({ support: value })}
            ></Select>
          </Col>
        </Row>
      </FieldSet>
    </div>
  );
};

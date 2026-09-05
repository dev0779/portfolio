import { MainButton } from "@/shared/Buttons";
import { IconButton } from "@/shared/Buttons/IconButton/IconButton";
import {
  SelectSearch,
  MultiSelect,
  TextInput,
  PasswordInput,
  RadioGroupButtons,
  NumberInput,
  EmailInput,
  DateInput,
  SignatureInput,
  PhoneNumberInput,
  CheckboxGroup,
  TextareaInput,
  Select,
  Checkbox,
} from "@/shared/Fields";
import {
  FilterMultiSelect,
  FilterSelect,
  FilterSelectSearch,
} from "@/shared/Filters";
import { Tooltip } from "@/shared/Tooltip";
import { GlobalThemeContext } from "@/theme";
import { requiredErrorMessage } from "@/utils/errors";
import React, { useContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import "./../Pages.scss";
import { PageContainer } from "@/shared/PageContainer/PageContainer";

export const Designer = () => {
  const formMethods = useForm({
    mode: "onBlur",
    defaultValues: {
      multiselect: [],
    },
  });

  const { toggle } = useContext(GlobalThemeContext);

  const customerOptions = [
    {
      label: "company",
      value: 1,
      info: "im some important info",
    },
    {
      label: "privado",
      value: 2,
    },
  ];

  const selectOptions = [
    {
      label: "company",
      value: 1,
    },
    {
      label: "privado",
      value: 2,
    },
  ];

  const tecnologyOptions = [
    { label: "React", value: "React" },
    { label: "Angular", value: "Angular" },
    { label: "Vue", value: "Vue" },
  ];

  const [multiFilter, setMultiFilter] = useState([]);

  const [selectSearchFilter, setSelectSearchFilter] = useState("");

  const [selectFilter, setSelectFilter] = useState("");
  return (
    <PageContainer>
      <div className="designer">
        <button
          tooltip="hello button"
          className="mt-4 p-2 bg-blue-500 text-white rounded"
          onClick={toggle}
        >
          Toggle Theme
        </button>
        <IconButton icon="Info" label="primary" size="xs"variant="primary"/>
        <IconButton icon="Info" label="primary" size="s" variant="primary" />
        <IconButton icon="Info" label="primary" size="m" variant="primary" />
        <IconButton icon="Info" label="primary" size="l" variant="primary" />
        <IconButton
          icon="Check"
          label="secondary"
          size="xs"
          variant="secondary"
        />
        <IconButton
          icon="Check"
          label="secondary"
          size="s"
          variant="secondary"
        />
        <IconButton
          icon="Check"
          label="secontary"
          size="m"
          variant="secondary"
        />
        <IconButton
          icon="Check"
          label="secondary"
          size="l"
          variant="secondary"
        />
        <IconButton icon="Info" label="tertiary" size="s" variant="tertiary" />
        <IconButton icon="Info" label="tertiary" size="m" variant="tertiary" />
        <IconButton icon="Info" label="tertiary" size="l" variant="tertiary" />
        <Tooltip content="Im a tooltip">
          <span>Hi new tooltip</span>
        </Tooltip>
        <FilterMultiSelect
          label="im a filter"
          info="hello"
          value={multiFilter}
          options={selectOptions}
          onChange={(value) => {
            console.log("multi search", value);
            setMultiFilter(value);
          }}
        />
        <FilterSelect
          label="im a filter"
          value={selectSearchFilter}
          options={tecnologyOptions}
          onChange={(value) => {
            console.log("selectSearchValue", value);
            setSelectFilter(value);
          }}
        />
        <FilterSelectSearch
          label="im a filter"
          value={selectFilter}
          options={tecnologyOptions}
          onChange={(value) => {
            console.log("select", value);
            setSelectFilter(value);
          }}
        />

        <span className="buttonscontainer">
          <MainButton
            variant="primary"
            label="primary"
            icon="Rocket"
            size="s"
          ></MainButton>

          <MainButton
            variant="primary"
            label="primary"
            icon="Rocket"
            size="m"
          ></MainButton>
          <MainButton
            variant="primary"
            label="primary"
            icon="Rocket"
            size="l"
          ></MainButton>
        </span>

        <span className="buttonscontainer">
          <MainButton
            variant="secondary"
            label="primary"
            icon="Rocket"
            size="s"
          ></MainButton>
          <MainButton
            variant="secondary"
            label="primary"
            icon="Rocket"
            size="m"
          ></MainButton>
          <MainButton
            variant="secondary"
            label="primary"
            icon="Rocket"
            size="l"
          ></MainButton>
        </span>

        <FormProvider {...formMethods}>
          <div className="designer">
            {/*     <Loader size="xs" text={ true} />
          <Loader size="s" text={ true} />
          <Loader size="l" text={true} /> */}

            <SelectSearch
              name="search"
              label="Selectsearch"
              info="hello search"
              options={selectOptions}
            />
            <Select
              name="select"
              label="select"
              info="hello select"
              options={selectOptions}
            />

            <MultiSelect
              name="multiselect"
              label="MultiSelect"
              info="hello multi"
              options={selectOptions}
            />
            <TextInput
              name="Username"
              label="User name"
              placeholder="Enter full name"
              info="text info"
              required={requiredErrorMessage}
            />
            <PasswordInput
              name="password"
              label="password"
              placeholder="enter your password"
              info="password"
              svg="Key"
              required
            />
            <TextInput
              name="address"
              label="address"
              svg="AddressBook"
              required
              info="your address"
            />

            <Checkbox name="some" label="please check if read" info="hello" />
            <RadioGroupButtons
              name="customerType"
              label="Customer Type"
              required
              options={customerOptions}
              direction="column"
              info="info radio"
            />

            <Select
              name="selectorType"
              label="Customer Type"
              placeholder="Choose customer type"
              options={selectOptions}
              info="hello im a info"
              required
            />
            <NumberInput
              name="quantity"
              label="quantidade"
              info="quantidade"
            ></NumberInput>

            <EmailInput name="email" label="email" required />

            <DateInput
              name="Date"
              label="date"
              info="hello"
              disabledDates={{ dayOfWeek: [0, 6] }}
              format="dd-MM-yyyy"
            />

            <SignatureInput name="signature" label="Signature" />

            <PhoneNumberInput
              name="phonenumber"
              label="Primary Contact"
              info="use your number"
              required
            />

            <CheckboxGroup
              name="tecnologies"
              label="add tecnologies"
              options={tecnologyOptions}
              info="some checkboxes"
            />

            <TextareaInput
              info="many reasons"
              name="reason"
              label="reasons"
            ></TextareaInput>
          </div>
        </FormProvider>
        {/*       <div className="p-4">
        <Box tooltip="hello">Hello! This uses the global theme.</Box>
        <button
          tooltip="hello"
          className="mt-4 p-2 bg-blue-500 text-white rounded"
          onClick={toggle}
        >
          Toggle Theme
        </button>

        <button
          className="mt-4 p-2 bg-orange-500 text-white rounded"
          onClick={() => setShowSpan(!showSpan)}
        >
          click
        </button>
        {showSpan && <span tooltip="hi ivo"> click on me ivo </span>}
      </div>
      <div className="appNav">
        <button
          className="mr-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setLogin(!login)}
        >
          Login
        </button>
        <button
          className="ml-4 bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => setRegister(!register)}
        >
          Register
        </button>
      </div> */}
        {/*       <Dialog open={login} onOpenChange={setLogin}>
        <Login
          onSuccess={() => {
            setLogin(false);
          }}
        />
      </Dialog>

      <Dialog open={register} onOpenChange={setRegister}>
        <Register
          onSuccess={() => {
            setRegister(false);
          }}
        />
      </Dialog> */}
        {/*       <div className="color-preview">
        <div className="color-box primary">Primary</div>
        <div className="color-box background">Background</div>
        <div className="color-box text">Text</div>
        <div className="color-box error">Error</div>
        <div className="color-box gray">Gray</div>
      </div> */}
      </div>
    </PageContainer>
  );
};

/* import { useContext, useState } from "react"; */
import styled from "styled-components";
/* import { GlobalThemeContext } from "@/theme/GlobalThemeProvider";
import { Dialog } from "@/shared/Dialog/Dialog";
import { Login, Register } from "./features/Auth"; */
import "./app.scss";
import "./Theme/theme-preview.scss";
import { FormProvider, useForm } from "react-hook-form";
import {
  TextInput,
  Checkbox,
  RadioGroupButtons,
  Select,
  EmailInput,
  NumberInput,
  PasswordInput,
  DateInput,
  SignatureInput,
  PhoneNumberInput,
  CheckboxGroup,
  TextareaInput,
  SelectSearch,
  MultiSelect,
} from "./shared/Fields";
import { GlobalThemeContext } from "./theme/GlobalThemeProvider";
import { useContext } from "react";
import { requiredErrorMessage } from "./utils/errors";
import { Tooltip } from "./shared/Tooltip/Tooltip/Tooltip";

/* const Box = styled.div`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border: 2px solid ${({ theme }) => theme.text};
  padding: 2rem;
  font-family: ${({ theme }) => theme.fonts.fontFamilyBody};
  transition:
    background 0.3s ease,
    color 0.3s ease;
`; */

function App() {
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

  return (
    <span className="padding">
      <button
        tooltip="hello button"
        className="mt-4 p-2 bg-blue-500 text-white rounded"
        onClick={toggle}
      >
        Toggle Theme
      </button>

      <Tooltip content="Im a tooltip">
        <span>Hi new tooltip</span>
      </Tooltip>

      <FormProvider {...formMethods}>
        <span className="block">
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
            form
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
        </span>
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
    </span>
  );
}

export default App;

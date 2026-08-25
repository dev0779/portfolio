/* import { useContext, useState } from "react"; */
import styled from "styled-components";
/* import { GlobalThemeContext } from "@/theme/GlobalThemeProvider";
import { Dialog } from "@/shared/Dialog/Dialog";
import { Login, Register } from "./features/Auth"; */
import "./app.scss";
import "./Theme/theme-preview.scss";
import { FormProvider, useForm } from "react-hook-form";
import { TextInput } from "./shared/Fields/text-input/TextInput";
import { Checkbox } from "./shared/Fields/checkbox/Checkbox";
import { RadioGroupButtons } from "./shared/Fields/radio-group-buttons/RadioGroupButtons";
import { Select } from "./shared/Fields/selectors/Select";

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
  const formMethods = useForm();

  const customerOptions = [
    {
      label: "company",
      value: 1,
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

  return (
    <>
      <FormProvider {...formMethods}>
        <TextInput
          name="Username"
          label="User name"
          placeholder="Enter full name"
          error="true"
          required
        />
        <TextInput
          name="password"
          label="password"
          type="password"
          placeholder="enter your password"
          required
        />
        <TextInput name="address" label="address" svg="AddressBook" required />

        <Checkbox name="some" label="please check if read" />
        <RadioGroupButtons
          name="customerType"
          label="Customer Type"
          required
          options={customerOptions}
          direction="column"
        />

        <Select
          name="customerType"
          label="Customer Type"
          placeholder="Choose customer type"
          options={selectOptions}
          required
          />
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
    </>
  );
}

export default App;

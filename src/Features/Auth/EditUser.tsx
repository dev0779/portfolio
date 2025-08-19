import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { requiredErrorMessage } from "../../Utils/errors";
import { TextInput } from "@/components/Fields";

export const EditUser = () => {
  
  const formMethods = useForm({
    shouldFocusError: false,
    shouldUnregister: true,
    defaultValues: {},
  });

  const {
    formState: { errors },
    handleSubmit,
  } = formMethods;

  const onSubmit = () => {};

  const onError = () => {};

  return (
    <FormProvider {...formMethods}>
      <TextInput name="firsName" label="firstName" />

      <TextInput name="lastName" label="lastName" />

      <TextInput
        name="username"
        label="username"
        placeholder="User Name"
        required={requiredErrorMessage}
      />

      <TextInput
        name="password"
        label="password"
        required={requiredErrorMessage}
      />

      <button onClick={handleSubmit(onSubmit, onError)}>submit</button>
    </FormProvider>
  );
};

export default EditUser;

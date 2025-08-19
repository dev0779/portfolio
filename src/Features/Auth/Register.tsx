import { FormProvider, useForm } from "react-hook-form";
import { requiredErrorMessage } from "../../Utils/errors";
import { TextInput } from "@/components/Fields";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "@/Api/graphql/User/user.mutation";

interface RegisterProps {
  onSuccess: () => void;
}

interface RegisterFormValues {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

const Register = ({ onSuccess }: RegisterProps) => {
  const [createUser, { loading }] = useMutation(CREATE_USER, {
    onCompleted: (data) => {
      if (data.success === true) {
        onSuccess();
      }
    },
  });

  const formMethods = useForm({
    shouldFocusError: false,
    shouldUnregister: true,
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
    },
  });
  const {
    formState: { errors },
    handleSubmit,
  } = formMethods;

  const onSubmit = (data: RegisterFormValues) => {
    console.log('data', data)
    createUser({
      variables: {
        ...data
      }
    });
  };

  const onError = () => {};

  return (
    <FormProvider {...formMethods}>
      <TextInput
        name="firstName"
        label="First name"
        required={requiredErrorMessage}
      />

      <TextInput
        name="lastName"
        label="Last Name"
        required={requiredErrorMessage}
      />

      <TextInput
        name="username"
        label="username"
        required={requiredErrorMessage}
      />

      <TextInput
        name="password"
        label="password"
        required={requiredErrorMessage}
      />

      <button
        onClick={(e) => {
          e.preventDefault();
          if (!loading) handleSubmit(onSubmit, onError)();
        }}
      >
        submit
      </button>
    </FormProvider>
  );
};

export default Register;

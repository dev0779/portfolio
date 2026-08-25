import { FormProvider, useForm, type FieldErrors } from "react-hook-form";
import { requiredErrorMessage, scrollToFirstError } from "../../utils/errors";
import { useMutation } from "@apollo/client/react/hooks/useMutation";
import { LOGIN_MUTATION } from "../../Api/graphql/Auth/auth.mutations";
import { TextInput, PasswordInput } from "@/shared/Fields";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext/UserContext";

interface LoginFormValues {
  username: string;
  password: string;
}

interface LoginProps {
  onSuccess: () => void;
}

const Login = ({ onSuccess }: LoginProps) => {
  const { setCurrentUser, refetchUser } = useContext(UserContext);

  const formMethods = useForm({
    shouldFocusError: true,
    shouldUnregister: true,
    defaultValues: { username: "", password: "" },
  });

  const { clearErrors, setError, handleSubmit } = formMethods;

  const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      console.log("Login successful:", data);

      if (data.success === true) {
        setCurrentUser(data.data);
        refetchUser();
        onSuccess();
      } else {
        setError("username", { type: "manual", message: data.message });
        setError("password", { type: "manual", message: data.message });
      }
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("data", data);
    login({ variables: { username: data.username, password: data.password } });
  };

  const onError = (errors: FieldErrors<LoginFormValues>) => {
    scrollToFirstError(errors);
  };

  return (
    <FormProvider {...formMethods}>
      {error && (
        <span>
          {" "}
          Network error: We are fascing some issues, please try again later!
        </span>
      )}
      <TextInput
        name="username"
        label="username"
        placeholder="User Name"
        required={requiredErrorMessage}
        onChange={() => clearErrors("username")}
      />

      <PasswordInput
        name="password"
        label="password"
        required={requiredErrorMessage}
        onChange={() => clearErrors("password")}
      />

      <button onClick={handleSubmit(onSubmit, onError)} disabled={loading}>
        submit
      </button>
    </FormProvider>
  );
};

export default Login;

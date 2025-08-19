import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { User, UserContextProps } from "./UserContextTypes";
import { useLazyQuery } from "@apollo/client";
import { CURRENT_USER } from "@/Api/graphql/Auth/auth.queries";

const defaultContext: UserContextProps = {
  currentUser: null,
  userLoading: true,
  setCurrentUser: () => {},
  refetchUser: async () => {},
};

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext<UserContextProps>(defaultContext);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [
    getCurrentUser,
    { data, loading: userLoading, error: userError, refetch },
  ] = useLazyQuery(CURRENT_USER);

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    getCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data?.success === true) {
      setCurrentUser(data?.data);
    } else if (data && !data.success) {
      setCurrentUser(null);
    }
  }, [data]);

  const refetchUser = async () => {
    if (refetch) await refetch();
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        refetchUser,
        userLoading,
        userError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

import type { ApolloError } from "@apollo/client";

export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  status?: string;
  lastLoggedIn?: string;
}

export interface UserContextProps {
  currentUser: User | null;
  userLoading: boolean;
  setCurrentUser: (user: User | null) => void;
  userError?: ApolloError;
  refetchUser: () => Promise<void>;
}

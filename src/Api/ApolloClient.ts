import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const httpLink = createHttpLink({
  uri: "http://localhost:3000/graphql", // your backend GraphQL URL
  credentials: "include", // important for cookies
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
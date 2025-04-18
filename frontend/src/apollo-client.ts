import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://localhost:3000/graphql", // PHP port
  cache: new InMemoryCache(),
  headers: {
    "Content-Type": "application/json", // Required
  },
});
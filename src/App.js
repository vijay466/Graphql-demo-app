import React from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import UserDetails from "./UserDetails";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <UserDetails login="vijay466" />
      </div>
    </ApolloProvider>
  );
}

export default App;

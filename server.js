const express = require("express");
const axios = require("axios");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const app = express();
const cors = require("cors");
// GraphQL schema
const schema = buildSchema(`
  type User {
    id: ID!
    login: String!
    url: String
    avatar_url: String
  }

  type Query {
    user(login: String!): User
  }
`);

// Resolver function to fetch user data from GitHub API
const root = {
  user: async ({ login }) => {
    try {
      const response = await axios.get(`https://api.github.com/users/${login}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching user data: ${error}`);
    }
  },
};
app.use(cors());
// GraphQL endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true, // Enable GraphiQL for easy testing
  })
);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

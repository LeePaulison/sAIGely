import gql from 'graphql-tag';

export const typeDefs = gql`
  type Preferences {
    id: ID!
    theme: String
    ai_settings: JSON
    data_retention: String
  }

  type User {
    id: ID!
    github_id: String!
    name: String
    email: String
    image: String
    preferences: Preferences
  }

  scalar JSON

  type Query {
    user(github_id: String!): User
    preferences(id: ID!): Preferences
  }

  type Mutation {
    createUser(github_id: String!, name: String, email: String, image: String): User
  }
`;

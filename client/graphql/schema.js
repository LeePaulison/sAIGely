// Node.js module imports
import { readFileSync } from 'fs';
import path from 'path';
// GraphQL tools imports
import { makeExecutableSchema } from '@graphql-tools/schema';
// Resolver imports
import { userResolvers } from './resolvers/userResolvers.js';

const schemaPath = path.join(process.cwd(), 'graphql/schemas/user.graphql');
const typeDefs = readFileSync(schemaPath, 'utf8');

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers: [userResolvers],
});

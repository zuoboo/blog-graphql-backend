// ApolloServerをimportする
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// GraphQLスキーマを定義する
const typeDefs = `#graphql
	type Query {
		info: String!
	}
`;

// リゾルバを定義する
const resolvers = {
	Query: {
		info: () => `This is the API of a Hackernews Clone`
	}
};

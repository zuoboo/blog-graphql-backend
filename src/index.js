// ApolloServerをimportする
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// schema.graphqlファイルを読み込む
const typeDefs = readFileSync("./src/schema.graphql", { encoding: "utf-8" });

// リゾルバを定義する
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: async (parent, args, context) => {
      return context.prisma.link.findMany();
    },
  },

  Mutation: {
    post: (parent, args, context) => {
      const newLink = context.prisma.link.create({
        data: {
          description: args.description,
          url: args.url,
        },
      });
      return newLink;
    },
  },
};

// ApolloServerをインスタンス化する
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// startStartaloneServer関数にApolloServerインスタンスを渡す
const { url } = await startStandaloneServer(server, {
  // contextを追加し、リゾルバに渡す
  context: async ({ req, res }) => ({
    prisma,
  }),
  listen: { port: 4000 },
});

// console.logでサーバーのURLを表示する
console.log(`🚀 Server ready at ${url}`);

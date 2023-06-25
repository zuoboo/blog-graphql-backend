// ApolloServerをimportする
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";

// Hackernewsの投稿
let links = [
  {
    id: "link-0",
    description: "Fullstack tutorial for GraphQL",
    url: "www.howtographql.com",
  },
];

// schema.graphqlファイルを読み込む
const typeDefs = readFileSync("./src/schema.graphql", { encoding: 'utf-8' });

// リゾルバを定義する
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
  },

  Mutation: {
    post: (parent, args) => {
      let idCount = links.length;
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };

      links.push(link);
      return link;
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
  listen: { port: 4000 },
});

// console.logでサーバーのURLを表示する
console.log(`🚀 Server ready at ${url}`);

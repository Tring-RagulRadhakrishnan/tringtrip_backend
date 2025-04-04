const { ApolloServer } = require("apollo-server-express");
const {typeDefs,resolvers} = require('../graphql/index.js')
const apolloServer =async (app)=>{
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
  
});

  await server.start()
  server.applyMiddleware({app,cors:false})
}
module.exports = apolloServer
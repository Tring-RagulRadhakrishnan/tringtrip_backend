const {mergeTypeDefs,mergeResolvers} =require("@graphql-tools/merge")

const userDefs=require('../graphql/typeDefs/userDefs.js')
const userResolver=require('../graphql/resolvers/userResolver.js')

// const packageDefs = require("../graphql/typeDefs/packageDefs.js")
// const packageResolver = require("../graphql/resolvers/packageResolver.js")

const typeDefs=mergeTypeDefs([userDefs])
const resolvers=mergeResolvers([userResolver])

module.exports={typeDefs,resolvers}
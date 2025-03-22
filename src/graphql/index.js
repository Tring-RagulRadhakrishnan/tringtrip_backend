const {mergeTypeDefs,mergeResolvers} =require("@graphql-tools/merge")

const userDefs=require('../graphql/typeDefs/userDefs.js')
const userResolver=require('../graphql/resolvers/userResolver.js')

const locationDefs = require('../graphql/typeDefs/locationDefs.js')
const locationResolver = require('../graphql/resolvers/locationResolver.js');

// const packageDefs = require("../graphql/typeDefs/packageDefs.js")
// const packageResolver = require("../graphql/resolvers/packageResolver.js")

const typeDefs=mergeTypeDefs([userDefs,locationDefs])
const resolvers=mergeResolvers([userResolver,locationResolver])

module.exports={typeDefs,resolvers}
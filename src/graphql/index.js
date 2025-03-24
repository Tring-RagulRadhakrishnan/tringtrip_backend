const {mergeTypeDefs,mergeResolvers} =require("@graphql-tools/merge")

const userDefs=require('../graphql/typeDefs/userDefs.js')
const userResolver=require('../graphql/resolvers/userResolver.js')

const locationDefs = require('../graphql/typeDefs/locationDefs.js')
const locationResolver = require('../graphql/resolvers/locationResolver.js');

const faqsDefs = require("./typeDefs/faqsDefs.js");
const faqsResolver = require("./resolvers/faqsResolver.js");

const packageDefs = require("../graphql/typeDefs/packageDefs.js")
const packageResolver = require("../graphql/resolvers/packageResolver.js")

const typeDefs=mergeTypeDefs([userDefs,locationDefs,faqsDefs,packageDefs])
const resolvers=mergeResolvers([userResolver,locationResolver,faqsResolver,packageResolver])

module.exports={typeDefs,resolvers}
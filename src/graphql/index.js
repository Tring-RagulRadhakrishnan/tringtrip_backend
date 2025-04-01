const {mergeTypeDefs,mergeResolvers} =require("@graphql-tools/merge")

const userDefs=require('./typeDefs/userDefs.js')
const userResolver=require('./resolvers/userResolver.js')

const locationDefs = require('./typeDefs/locationDefs.js')
const locationResolver = require('./resolvers/locationResolver.js');

const faqsDefs = require("./typeDefs/faqsDefs.js");
const faqsResolver = require("./resolvers/faqsResolver.js");

const packageDefs = require("./typeDefs/packageDefs.js")
const packageResolver = require("./resolvers/packageResolver.js")

const bookingsDefs = require("./typeDefs/bookingsDefs.js")
const bookingsResolver = require("./resolvers/bookingsResolver.js")

const typeDefs=mergeTypeDefs([userDefs,locationDefs,faqsDefs,packageDefs,bookingsDefs])
const resolvers=mergeResolvers([userResolver,locationResolver,faqsResolver,packageResolver,bookingsResolver])

module.exports={typeDefs,resolvers}
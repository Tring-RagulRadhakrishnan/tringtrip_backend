const {gql} = require('apollo-server-express')

const userDefs=gql`
    type User{
        user_id:Int
        name:String
        email:String
        phone_number:String
        role:String
    }
    
    type Query{
        login(email:String!,password:String!):User
        getUser:User
    }

    type Mutation{
        createUser(name:String!,email:String!,phone_number:String!,password:String!):User
        updateUser(name:String!,phone_number:String!,user_id:Int!):User
        logout:String
    }
`

module.exports=userDefs
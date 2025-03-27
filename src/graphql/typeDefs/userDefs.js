const {gql} = require('apollo-server-express')

const userDefs=gql`
    type User{
        user_id:Int
        name:String
        email:String
        phone_number:String
    }
    
    type Query{
        login(email:String!,password:String!):User
    getUser:User
    }

    type Mutation{
        createUser(name:String!,email:String!,phone_number:String!,password:String!):User
    }
`

module.exports=userDefs
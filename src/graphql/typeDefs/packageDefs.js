// const { gql } = require("apollo-server-express");

// const packageDefs = gql`
//     type Package{
//         package_id:Int
//         package_img:String
//         title:String
//         days:String
//         visit_place:String
//         price:Int
//     }

//     type Query{
//         getPackageByLocation(location:String!):[Package]
//         getAllPackages(page:Int!):[Package]
//     }
//     type Mutation{
//         createPackage(package_img:String!,title:String!,days:String!,visit_place:String!,price:Int!,location:String!):String
//     }
// `;

// module.exports = packageDefs;

const { gql } = require("apollo-server-express");

const packageDefs = gql`
  type Package {
    package_id: Int
    package_img: String
    title: String
    days: String
    visit_place: String
    price: Int
    location: String
  }

  type Query {
    getAllPackages(page: Int!): [Package]
    getPackageByLocation(location: String!): [Package]
  }

  type Mutation {
    createPackage(
      package_img: String!
      title: String!
      days: String!
      visit_place: String!
      price: Int!
      location: String!
    ): String
  }
`;

module.exports = packageDefs;

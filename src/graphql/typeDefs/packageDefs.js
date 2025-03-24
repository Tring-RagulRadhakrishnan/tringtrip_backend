const { gql } = require("apollo-server-express");

const packageDefs = gql`
    type Package{
        package_id:Int
        package_img:String
        title:String
        days:String
        visit_place:String
        price:Int
    }

    type Query{
        getPackageByLocation(location:String!):[Package]
    }

`;

module.exports = packageDefs;

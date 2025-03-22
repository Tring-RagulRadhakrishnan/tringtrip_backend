const {gql} = require('apollo-server-express')

const locationDefs = gql`
    type Location{
        tp_id:Int
        location:String
        image:String
        cover_image:String
        subtitle:String
    }
    
    type Query{
        getBestPackage:[Location]
        getVisaFreePackage:[Location]
        getInternationalPackage:[Location]
    }

`

module.exports = locationDefs
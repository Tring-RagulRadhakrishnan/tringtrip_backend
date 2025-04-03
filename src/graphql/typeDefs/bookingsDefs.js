const { gql } = require("apollo-server-express");

const bookingsDefs = gql`
  type Booking {
    booking_id:Int
    package_id: Int
    booking_date: String
    count: Int
    total_price: Float
    user_id: Int
    package_img: String
    title: String
    days: String
    visit_place: String
    price: Float
    location: String
  }
  type Query {
    getBookingByUser: [Booking]
  }

  type Mutation {
    addBooking(
      package_id: Int!
      booking_date: String!
      count: Int!
      total_price: Int!
      user_id: Int!
      email: String!
    ): String
  }
`;

module.exports = bookingsDefs;
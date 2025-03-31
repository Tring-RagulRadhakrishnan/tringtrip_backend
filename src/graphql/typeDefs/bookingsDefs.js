const { gql } = require("apollo-server-express");

const bookingsDefs = gql`
  type Booking {
    package_id: Int
    booking_date: String
    count: Int
    total_price: Float
    user_id: Int
    package_img: String
    title: String
    days: String
    description: String
    price: Float
    location: String
  }
  type Query {
    getBookingByUser(userId: Int!): [Booking]
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
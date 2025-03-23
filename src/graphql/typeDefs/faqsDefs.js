const { gql } = require("apollo-server-express");

const faqsDefs = gql`
  type Faqs {
    faq_title: String
    content: String
  }

  type Query {
    getFaqs: [Faqs]
  }
`;
module.exports = faqsDefs;

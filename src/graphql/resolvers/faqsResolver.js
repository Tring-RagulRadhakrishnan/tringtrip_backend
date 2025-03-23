const pool = require("../../config/database");

const faqsResolver = {
  Query: {
    getFaqs: async () => {
      try {
        const response = await pool.query("select faq_title,content from faqs");
        if (response.rowCount === 0) {
          throw new Error("There is no Faqs");
        }
        return response.rows;
      } catch (err) {
        console.log("log from faqs resolver", err);
      }
    },
  },
};

module.exports = faqsResolver;

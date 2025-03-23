const pool = require("../../config/database");

const locationResolver = {
  Query: {
    getBestPackage: async () => {
      try {
        const response = await pool.query(
          "SELECT tp_id,location,image,cover_image,subtitle FROM tourist_place WHERE rating = 5"
        );
        if (response.rowCount === 0) {
          throw new Error("There is no Best package");
        }

        return response.rows;
      } catch (err) {
        console.log("log from best pack resolver", err);
      }
    },

    getVisaFreePackage: async () => {
      try {
        const response = await pool.query(
          "SELECT tp_id,location,image,cover_image,subtitle FROM tourist_place WHERE visa_free=true"
        );

        return response.rows;
      } catch (err) {
        console.log("log from free visa resolver", err);
      }
    },
    getInternationalPackage: async () => {
      try {
        const response = await pool.query(
          "SELECT tp_id,location,image,cover_image,subtitle FROM tourist_place WHERE is_international=true"
        );

        return response.rows;
      } catch (err) {
        console.log("log from international resolver", err);
      }
    },
  },
};

module.exports = locationResolver;

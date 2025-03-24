const pool = require("../../config/database");
const authMiddleware = require("../../middleware/authMiddleware");

const packageResolver = {
  Query: {
    getPackageByLocation: async (_, { location }, {req}) => {
      try {
        const response = await pool.query(
          "select package_id,package_img,title,days,visit_place,price from packages where location = $1",
          [location]
        );

        // response.rowCount === 0 && throw new Error("No package available for this location");
        if(response.rowCount === 0)
            throw new Error("No package available for this location")

        return response.rows;
      } catch (err) {
        console.log("error log fron package resolver by location",err)
      }
    },
  },
};

module.exports = packageResolver;

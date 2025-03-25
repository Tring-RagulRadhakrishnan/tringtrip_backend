// const pool = require("../../config/database");
// const authMiddleware = require("../../middleware/authMiddleware");

// const packageResolver = {
//   Mutation: {
//     createPackage: async (
//       _,
//       { package_img, title, days, visit_place, price,location }
//     ) => {
//       try {
//         const response = await pool.query(
//           "Insert into packages(package_img,title,days,visit_place,price,location) values ($1,$2,$3,$4,$5,$6) returning *",
//           [package_img, title, days, visit_place, price,location]
//         );

//         if (response.rowCount === 0) {
//           throw new Error("Package is Not Created");
//         }
//         console.log(response.rows[0]);

//         return "Package created Successfully";
//       } catch (err) {
//         console.log("err log from create package resolver", err);
//       }
//     },
//   },
//   Query: {
//     getPackageByLocation: async (_, { location }, { req }) => {
//       try {
//         const response = await pool.query(
//           "select package_id,package_img,title,days,visit_place,price from packages where location = $1",
//           [location]
//         );

//         // response.rowCount === 0 && throw new Error("No package available for this location");
//         if (response.rowCount === 0)
//           throw new Error("No package available for this location");

//         return response.rows;
//       } catch (err) {
//         console.log("error log fron package resolver by location", err);
//       }
//     },
//     getAllPackages: async (_, { page }, {}) => {
//       try {
//         const offset = (page - 1) * 6;
//         const response = await pool.query(
//           `select package_id,package_img,title,days,visit_place,price from packages limit 6 offset ${offset}`
//         );
//         if (response.rowCount === 0)
//           throw new Error("No package available for this location");
//         return response.rows;
//       } catch (err) {
//         console.log("error log from all packages resolver", err);
//       }
//     },
//   },
// };

// module.exports = packageResolver;

const pool = require("../../config/database");

const packageResolver = {
  Query: {
    getAllPackages: async (_, { page }) => {
      const offset = (page - 1) * 6;
      const response = await pool.query(
        `SELECT package_id, package_img, title, days, visit_place, price, location FROM packages LIMIT 6 OFFSET $1`,
        [offset]
      );
      return response.rows;
    },
    getPackageByLocation: async (_, { location }) => {
      const response = await pool.query(
        `SELECT package_id, package_img, title, days, visit_place, price, location FROM packages WHERE location = $1`,
        [location]
      );
      return response.rows;
    },
  },
  Mutation: {
    createPackage: async (_, { package_img, title, days, visit_place, price, location }) => {
      const response = await pool.query(
        `INSERT INTO packages (package_img, title, days, visit_place, price, location) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [package_img, title, days, visit_place, price, location]
      );
      if (response.rowCount === 0) {
        throw new Error("Failed to create package");
      }
      return "Package created successfully";
    },
  },
};

module.exports = packageResolver;

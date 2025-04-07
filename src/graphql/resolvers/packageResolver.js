const pool = require("../../config/database");

const packageResolver = {
  Mutation: {
    createPackage: async (
      _,
      { package_img, title, days, visit_place, price, location }
    ) => {
      try {
        const response = await pool.query(
          "Insert into packages(package_img,title,days,visit_place,price,location) values ($1,$2,$3,$4,$5,$6) returning *",
          [package_img, title, days, visit_place, price, location]
        );

        if (response.rowCount === 0) {
          throw new Error("Package is Not Created");
        }
        console.log(response.rows[0]);

        return "Package created Successfully";
      } catch (err) {
        console.log("err log from create package resolver", err);
      }
    },
    updatePackage: async (
      _,
      { package_img, title, days, visit_place, price, location, package_id }
    ) => {
      try {
        const response = await pool.query(
          "update packages set package_img=$1,title = $2,days = $3,visit_place = $4,price = $5,location = $6 ,updated_at = CURRENT_TIMESTAMP where package_id = $7 returning package_id",
          [package_img, title, days, visit_place, price, location, package_id]
        );
        if (response.rowCount === 0) {
          throw new Error("Error in Update");
        }
        return "Update successfull";
      } catch (err) {
        console.log("error log from updateUser resolver", err);
      }
    },
    deletePackage: async (_, { package_id }) => {
      try {
        const response = await pool.query(
          "delete from packages where package_id = $1 returning package_id",
          [package_id]
        );
        if (response.rowCount === 0) {
          throw new Error("Error in Update");
        }
        return "package deleted";
      } catch (err) {
        console.log("error log from deletepackage resolver", err);
      }
    },
  },
  Query: {
    getPackageByLocation: async (_, { location }, { req }) => {
      try {
        const response = await pool.query(
          "select package_id,package_img,title,days,visit_place,price from packages where location = $1",
          [location]
        );

        // response.rowCount === 0 && throw new Error("No package available for this location");
        if (response.rowCount === 0)
          throw new Error("No package available for this location");

        return response.rows;
      } catch (err) {
        console.log("error log fron package resolver by location", err);
      }
    },
    getAllPackages: async (_, { page }, {}) => {
      try {
        const offset = (page - 1) * 6;
        const response = await pool.query(
          `select package_id,package_img,title,days,visit_place,price, COUNT(*) OVER() AS total_count from packages limit 6 offset ${offset}`
        );
        if (response.rowCount === 0)
          throw new Error("No package available for this location");
        return response.rows;
      } catch (err) {
        console.log("error log from all packages resolver", err);
      }
    },
    getPackageBySearch: async (_, { searchTerm }, {}) => {
      try {
        const response = await pool.query(
          "select package_id,package_img,title,days,visit_place,price from packages where location ILIKE  $1;",
          [`${searchTerm}%`]
        );
        if (response.rowCount === 0)
          throw new Error("No package available for this location");

        return response.rows;
      } catch (err) {
        console.log("error log from getPackageBySearch resolver", err);
      }
    },
    getLowPackage: async () => {
      try {
        const response = await pool.query(
          "SELECT p.* FROM packages p WHERE p.price = (SELECT MIN(p2.price) FROM packages p2 WHERE p2.location = p.location)"
        );
        if(response.rowCount===0)
          throw new Error("package not found")
        return response.rows
      } catch (err) {
        console.log("error log from getLowPackage",err);
        
      }
    },
  },
};

module.exports = packageResolver;

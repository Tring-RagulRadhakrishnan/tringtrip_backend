const bcrypt = require("bcrypt");
const pool = require("../../config/database");

const userResolver = {
    
  Mutation: {
    createUser: async (_, { name, email, phone_number, password }) => {
      try {
        console.log(name,email,phone_number);
        
        
        const existingUser = await pool.query(
          "SELECT * FROM user_details WHERE email=$1",
          [email]
        );

        if (existingUser.rowCount > 0) throw new Error("user is already found");
        const hashPassword = await bcrypt.hash(password,10)

        const res = await pool.query(
          "INSERT INTO user_details(name,email,phone_number,password) VALUES ($1,$2,$3,$4) RETURNING user_id, name",
          [name, email, phone_number, hashPassword]
        );

        console.log(res.rows[0]);
        console.log("user registration successfull");

        return res.rows[0];
      } catch (err) {
        console.log("error from create user resolver");
        console.log(err.message);
        throw new Error(err.message);
      }
    },
  },

  Query: {
    getUser: async (_, { email, password }) => {
      console.log("log from get user");

      try {
        const res = await pool.query(
          "SELECT user_id,name ,password from user_details where email=$1",
          [email]
        );

        if (res.rowCount === 0) return { emailError: true };

        const userData = res.rows[0];

        const match = bcrypt.compare(password,userData.password);

        if (!match) return { passwordError: true };

        return { ...res.rows[0], isAuthenticated: true };
      } catch (err) {
        console.log("log from get user error", err);
        throw new Error(err);
      }
    },
  },
};

module.exports = userResolver;

const bcrypt = require("bcrypt");
const pool = require("../../config/database");
const generateToken = require("../../utils/generateJwtToken");
const setCookie = require("../../utils/setCookie");
const authMiddleware = require("../../middleware/authMiddleware");

const userResolver = {
  Mutation: {
    createUser: async (_, { name, email, phone_number, password }) => {
      try {
        console.log(name, email, phone_number);

        const existingUser = await pool.query(
          "SELECT * FROM user_details WHERE email=$1",
          [email]
        );

        if (existingUser.rowCount > 0) throw new Error("user is already found");
        // const hashPassword = await bcrypt.hash(password, 10);

        const res = await pool.query(
          "INSERT INTO user_details(name,email,phone_number,password) VALUES ($1,$2,$3,$4) RETURNING user_id, name",
          [name, email, phone_number, password]
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
    login: async (_, { email, password }, { res }) => {
      console.log("log from get user", email, password);

      try {
        const response = await pool.query(
          "SELECT user_id,name ,password from user_details where email=$1",
          [email]
        );

        if (response.rowCount === 0) {
          throw new Error("User Not Found");
        }

        const userData = response.rows[0];
        const match = await bcrypt.compare(password, userData.password);

        if (!match) {
          throw new Error("Invalid Password");
        }

        const user = {
          id: userData.user_id,
          role: "user",
        };

        console.log(user);

        const token = generateToken(user);
        setCookie(token, res);

        return userData;
      } catch (err) {
        console.log("log from get user error", err);
        throw new Error(err);
      }
    },
    getUser : async(_,{},{req})=>{
      const userData = authMiddleware(req);
      const id = userData?.id;
      try{
          const response = await pool.query("select user_id,name,email from user_details where user_id = $1",[id]);
          if(response.rowCount===0)
            throw new Error("User Not Found");
          return response.rows[0];
      }catch(err){
          console.log("error from user resolver getUser",err);
          
      }
    }
  },
};

module.exports = userResolver;

const express = require("express");
const cors = require("cors");
require("dotenv").config();
// const cookieParser = require('cookie-parser');
const apolloServer = require("./config/apolloServer");

const app = express();

app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true,
}));

// app.use(cookieParser());

// app.use(cors());

const startServer = async () => {
  try {
    await apolloServer(app);
    app.listen(process.env.PORT , () => {
      console.log(`App is running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error("Error in server startup:", err);
  }
};

startServer();

// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();
// const apolloServer = require("./config/apolloServer");

// const app = express();

// app.use(cors({
//   origin: ["http://localhost:5173"],
//   credentials: true,
// }));

// // app.use(cors());

// const startServer = async () => {
//   try {
//     await apolloServer(app);
//     app.listen(process.env.PORT , () => {
//       console.log(`App is running on port ${process.env.PORT}`);
//     });
//   } catch (err) {
//     console.error("Error in server startup:", err);
//   }
// };

// startServer();

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51R6xZMI1bsoZ9PKQ6sVShdtoIE8rL1u5WsxvHgHxof9kSPp3F6PFkmzzHT5GJGmhTfZ8R5n5Fr3EdCrJjAODDtgx00cXNi2JM7"
);
require("dotenv").config();
const apolloServer = require("./config/apolloServer");
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// app.use(cors());


const startServer = async ()=>{
  try{
      await apolloServer(app)
      app.listen(process.env.PORT,()=>{
          console.log(`app is running in port ${process.env.PORT}`);
      })

  }catch(err){
      console.log("index js",err);
  }

}

startServer()

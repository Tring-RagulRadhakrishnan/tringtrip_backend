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

app.use(express.json());

app.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "inr",
      payment_method_types: ["card"],
    });
    console.log(paymentIntent);
    

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const startServer = async () => {
  try {
    await apolloServer(app);
    app.listen(process.env.PORT, () => {
      console.log(`App is running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error("Error in server startup:", err);
  }
};

startServer();

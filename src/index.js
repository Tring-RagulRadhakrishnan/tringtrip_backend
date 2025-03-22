const express = require("express");
const cors = require("cors");
const apolloServer = require("./config/apolloServer");
require("dotenv").config()
const app = express();
app.use(cors({
    origin: ["http://localhost:5173"], 
    credentials: true, 
  }));

// app.use(cors());




const startServer = async ()=>{
    try{
        await apolloServer(app)
        app.listen(process.env.PORT,()=>{
            console.log(`app is running in port ${process.env.PORT}`);
        })

    }catch(err){
        console.log("indes js",err);
    }

}

startServer()


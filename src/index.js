const express = require("express");
const cors = require("cors");
const apolloServer = require("./config/apolloServer");
require("dotenv").config()
const multer = require("multer");
const path = require("path");
const fs = require("fs")

const app = express();
app.use(cors({
    origin: ["http://localhost:5173"], 
    credentials:true,
  }));

// app.use(cors());

const uploadsDir = path.join(__dirname, 'uploads');



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    },
});
const upload = multer({ storage });


app.use("/src/uploads", express.static(uploadsDir));


app.post("/upload", upload.single("file"), (req, res) => {
    console.log("Uploaded file:", req.file);

    if (!req.file) {
        return res.status(400).json({ message: "File upload failed" });
    }

   
    res.status(200).json({ filePath: `/uploads/${req.file.filename}` });
});

const startServer = async () => {
    try {
        await apolloServer(app);
        app.listen(process.env.PORT, () => {
            console.log(`App is running on port ${process.env.PORT}`);
        });
    } catch (err) {
        console.log("Error in server startup:", err);
    }
};

startServer();
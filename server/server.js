import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cards from "./routes/cards.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use(express.urlencoded({ extended: true}));
app.use(cards);

const uri = process.env.MONGODB_URI;

mongoose
.connect(uri)
.then(()=>{console.log("mongoDB Connected")})
.catch((error) => {
    console.log("MongoDB connection error", error)
})

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.listen(PORT,()=> {
    console.log(`server running on http://localhost:${PORT}`)
})
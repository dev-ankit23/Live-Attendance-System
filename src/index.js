import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db.js";

const app = express();
const port = process.env.PORT;
await connectDB();

app.get("/", (req, res) => {
  res.send("hello mongodb");
});

app.listen(port, (req, res) => {
  console.log(`App is listening to port ${port}`);
});

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

async function run() {
  const app = express();

  const { connection: db } = await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wlznhqo.mongodb.net/rusyn-cultural-hub?retryWrites=true&w=majority`)

  db.on("connection", () => console.log("successfully connected to database..."));
  db.on("error", (error) => console.error(`error: ${error}`));

  app.listen(process.env.PORT, () => {
    console.log(`running on port ${process.env.PORT}...`);
  });
}

run().catch(error => console.error(error));

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

async function run() {
  const app = express();

  // CONTINUE: add password to URI string, perhaps additional options, check if you can connect with atlas
  await mongoose.connect(`mongodb+srv://teomedesi:<password>@cluster0.wlznhqo.mongodb.net/?retryWrites=true&w=majority`)

  app.listen(process.env.PORT, () => {
    console.log(`running on port ${process.env.PORT}...`);
  });
}

run().catch(error => console.error(error));

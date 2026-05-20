import mongoose from "mongoose";
import dotenv from "dotenv";
import Provider from "../models/provider.js";

if (process.env.NODE_ENV != "production") {
  dotenv.config();
}

const providers = [
  "Provider 1",
  "Provider 2",
  "Provider 3",
  "Provider 4",
  "Provider 5",
  "Provider 6",
  "Provider 7",
  "Provider 8",
];

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  await Provider.deleteMany();

  await Provider.insertMany(
    providers.map((name) => ({
      name,
    })),
  );

  console.log("Providers Seeded");

  process.exit();
};

seed();

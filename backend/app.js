import dotenv from "dotenv";

if (process.env.NODE_ENV != "production") {
  dotenv.config();
}

import express from "express";
import mongoose from "mongoose";
import { errorMiddleware } from "./middelware.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8080;

import dashboradRoutes from "./routes/dashboard.js";
import leadRoutes from "./routes/lead.js";
import webhookRoutes from "./routes/webhook.js";

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json("working");
});

app.use("/api", dashboradRoutes);
app.use("/api", leadRoutes);
app.use("/api/webhook", webhookRoutes);

app.use(errorMiddleware);

main()
  .then(() => {
    app.listen(port, () => {
      console.log("connected to db");
      console.log(`server running on port ${port}`);
    });
  })
  .catch((err) => console.log(err));

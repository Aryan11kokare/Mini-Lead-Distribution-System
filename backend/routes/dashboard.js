import express from "express";

import { getData } from "../controllers/dashboard.js";
const router = express.Router();

router.get("/dashboard", getData);

export default router;

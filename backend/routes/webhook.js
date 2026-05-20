import express from "express";
import { resetQuota } from "../controllers/webhook.js";
const router = express.Router();

router.post("/reset-quota", resetQuota);

export default router;

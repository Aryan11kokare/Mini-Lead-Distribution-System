import express from "express";
import { genrateLead, getLeads } from "../controllers/lead.js";
const router = express.Router();

router.post("/lead", genrateLead);

router.get("/lead", getLeads);

export default router;

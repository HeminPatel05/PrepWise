import express from "express";
import {
  // getSessionController,
  postSession,
  updateSession,
  getSessionController,
} from "../controllers/sessionController.js";

import {
  postSummary,
  getSummary,
  updateSummary,
} from "../controllers/progressController.js";

const router = express.Router();

router.get("/sessions", getSessionController);

router.post("/sessions", postSession);

router.put("/sessions/:session_id", updateSession);

router.get("/summary", getSummary);

router.post("/summary", postSummary);

router.put("/summary", updateSummary);

export default router;

import express from "express";
import {
  getAllFlashcards,
  getFlashcardById,
  createFlashcard,
  updateFlashcard,
  deleteFlashcard,
} from "../controllers/flashcardController.js";

const router = express.Router();

// Define routes
router.get("/", getAllFlashcards);
router.get("/:id", getFlashcardById);
router.post("/", createFlashcard);
router.put("/:id", updateFlashcard);
router.delete("/:id", deleteFlashcard);

export default router;

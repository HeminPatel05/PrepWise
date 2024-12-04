const express = require("express");
const {
  getAllFlashcards,
  getFlashcardById,
  createFlashcard,
  updateFlashcard,
  deleteFlashcard,
} = require("../controllers/flashcardController.js");

const router = express.Router();

// Define routes
router.get("/", getAllFlashcards);
router.get("/:id", getFlashcardById);
router.post("/", createFlashcard);
router.put("/:id", updateFlashcard);
router.delete("/:id", deleteFlashcard);

module.exports = router;
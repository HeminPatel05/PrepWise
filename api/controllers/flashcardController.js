import * as flashcardService from "../services/flashcardService.js";

// Retrieve all flashcards with optional type filter
export const getAllFlashcards = async (req, res) => {
  const { type } = req.query;

  try {
    const filter = type ? { type } : {};
    const flashcards = await flashcardService.getAllFlashcards(filter);
    res.json(flashcards);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Retrieve a flashcard by ID
export const getFlashcardById = async (req, res) => {
  const { id } = req.params;

  try {
    const flashcard = await flashcardService.getFlashcardById(id);
    if (!flashcard) {
      return res.status(404).json({ error: "Flashcard not found" });
    }
    res.json(flashcard);
  } catch (error) {
    console.error("Error retrieving flashcard by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new flashcard
export const createFlashcard = async (req, res) => {
  const { section, type, question, options, answer, explanation } = req.body;

  if (!section || !type || !question || !options || !answer) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const newFlashcard = await flashcardService.createFlashcard({
      section,
      type,
      question,
      options,
      answer,
      explanation,
    });
    res.status(201).json(newFlashcard);
  } catch (error) {
    if (error.message === "A flashcard with this question already exists.") {
      return res.status(409).json({ error: error.message });
    }
    console.error("Error creating flashcard:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a flashcard by ID
export const updateFlashcard = async (req, res) => {
  const { id } = req.params;
  const { section, type, question, options, answer, explanation } = req.body;

  try {
    const updatedFlashcard = await flashcardService.updateFlashcard(id, {
      section,
      type,
      question,
      options,
      answer,
      explanation,
    });

    if (!updatedFlashcard) {
      return res.status(404).json({ error: "Flashcard not found" });
    }

    res.json(updatedFlashcard);
  } catch (error) {
    console.error("Error updating flashcard:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a flashcard by ID
export const deleteFlashcard = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedFlashcard = await flashcardService.deleteFlashcard(id);
    if (!deletedFlashcard) {
      return res.status(404).json({ error: "Flashcard not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting flashcard:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

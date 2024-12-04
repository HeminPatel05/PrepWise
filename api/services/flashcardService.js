import Flashcard from "../models/flashcard.js";

// Service to retrieve all flashcards, with optional filtering
export const getAllFlashcards = async (filter = {}) => {
  return await Flashcard.find(filter); // Apply the filter if provided
};

// Service to retrieve a flashcard by ID
export const getFlashcardById = async (id) => {
  return await Flashcard.findById(id);
};

// Service to create a new flashcard
export const createFlashcard = async (flashcardData) => {
  // Check if a flashcard with the same question already exists
  const existingFlashcard = await Flashcard.findOne({
    question: flashcardData.question,
  });
  if (existingFlashcard) {
    throw new Error("A flashcard with this question already exists.");
  }

  // Create a new flashcard
  const newFlashcard = new Flashcard(flashcardData);
  return await newFlashcard.save();
};

// Service to update a flashcard by ID
export const updateFlashcard = async (id, updateData) => {
  // Update the flashcard and return the updated document
  return await Flashcard.findByIdAndUpdate(id, updateData, {
    new: true, // Return the updated document
    runValidators: true, // Ensure validation rules are applied
  });
};

// Service to delete

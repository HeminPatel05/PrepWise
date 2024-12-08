import mongoose from "mongoose";

// Define Flashcard schema
const flashcardSchema = new mongoose.Schema(
  {
    section: { type: String, required: true },
    type: { type: String, required: true },
    question: { type: String, required: true, unique: true }, // Add unique constraint
    options: { type: [String], required: true },
    answer: { type: String, required: true },
    explanation: { type: String, default: "" },
  },
  { collection: "flashcard" } // Use the existing collection
);

// Export the Flashcard model
export default mongoose.model("Flashcard", flashcardSchema);

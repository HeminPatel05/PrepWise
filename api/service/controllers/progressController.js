import {
  saveProgress as progressService,
  getProgress,
  updateProgress,
} from "../services/progressService.js";

// Controller to create a new progress
export const postSummary = async (req, res) => {
  const newProgress = { ...req.body };
  try {
    const progress = await progressService(newProgress);
    res.status(200).json(progress);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the progress." });
  }
};

// Controller to get a summary by user_id (GET /progress)
export const getSummary = async (req, res) => {
  try {
    const { user_id } = req.query;

    // Call service function to get progress summary for this user
    const summary = await getProgress(user_id);

    // If no summary is found, return 404
    if (!summary) {
      return res.status(404).json({ error: "Summary not found" });
    }

    // Return the summary as a JSON response
    return res.status(200).json(summary);
  } catch (error) {
    console.error("Error retrieving summary:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while retrieving the summary." });
  }
};

// Controller to update a summary by user_id (PUT /progress)
export const updateSummary = async (req, res) => {
  try {
    // Extract user_id from query parameters and updated data from request body
    const { user_id } = req.query;
    const updatedSummaryData = { ...req.body };

    // Call service function to update progress for this user
    const updatedData = await updateProgress(user_id, updatedSummaryData);

    // If no summary was found, return a 404 response
    if (!updatedData) {
      return res.status(404).json({ error: "No summary found for this user" });
    }

    // Return the updated summary data
    return res.status(200).json(updatedData);
  } catch (error) {
    console.error("Error updating summary:", error);

    // Handle validation errors or other bad input cases
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: "Invalid input data" });
    }

    // Handle internal server errors
    return res
      .status(500)
      .json({ error: "An error occurred while updating the summary." });
  }
};

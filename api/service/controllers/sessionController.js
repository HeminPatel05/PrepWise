import {
  saveSession as sessionService,
  getSessions,
  updateSession as updateSessionService,
} from "../services/progressService.js";

// Controller to create a new session
export const postSession = async (req, res) => {
  const newSession = { ...req.body };
  try {
    const session = await sessionService(newSession);
    res.status(200).json(session);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the session." });
  }
};

// Controller to get all sessions for a specific user with optional filters
export const getSessionController = async (req, res) => {
  try {
    // Extract query parameters from the request
    const { user_id, section, date_range } = req.query;

    // Check if user_id is provided
    if (!user_id) {
      return res.status(400).json({ error: "user_id is required" });
    }

    // Call the service function to get sessions with optional filters
    const sessions = await getSessions(user_id, section, date_range);

    // Check if no sessions were found
    if (sessions.length === 0) {
      return res.status(404).json({ error: "No sessions found for this user" });
    }

    // Return the retrieved sessions
    return res.status(200).json(sessions);
  } catch (error) {
    console.error("Error retrieving sessions:", error.message);
    return res
      .status(500)
      .json({ error: "An error occurred while retrieving sessions." });
  }
};

// Controller to update an existing session by ID
export const updateSession = async (req, res) => {
  try {
    // Extract session_id from path parameters and new data from request body
    const { session_id } = req.params;
    const sessionData = req.body;

    // Call the service function to update the session
    const updatedSession = await updateSessionService(session_id, sessionData);

    // If no session is found, return a 404 error
    if (!updatedSession) {
      return res.status(404).json({ error: "Session not found" });
    }

    // Return the updated session
    return res.status(200).json(updatedSession);
  } catch (error) {
    console.error("Error updating session:", error.message);

    // Handle validation errors or other bad input cases
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: "Invalid input data" });
    }

    // Handle internal server errors
    return res
      .status(500)
      .json({ error: "An error occurred while updating the session." });
  }
};

import { Progress, Session } from "../models/progress.js";

export const saveProgress = (newProgress) => {
  if (typeof newProgress.user_id !== "string") {
    return {
      success: false,
      message: "Invalid user_id: must be a string",
    };
  }
  const progress = new Progress(newProgress);
  return progress.save();
};

export const getProgress = async (user_id) => {
  console.log("Querying progress for user_id:", user_id);
  const progressOfUser = await Progress.findOne({ user_id: user_id });
  return progressOfUser;
};

// Service function to update progress for a specific user
export const updateProgress = async (user_id, updatedProgress) => {
  if (typeof updatedProgress.user_id !== "string") {
    return {
      success: false,
      message: "Invalid user_id: must be a string",
    };
  }

  try {
    // Find the progress entry by user_id and update it with new data
    const updatedData = await Progress.findOneAndUpdate(
      { user_id: user_id }, // Find progress by user_id
      { $set: updatedProgress }, // Update with new progress data
      { new: true, runValidators: true } // Return updated document, apply validation
    );

    // If no progress entry is found, return null
    if (!updatedData) {
      return null;
    }

    return updatedData;
  } catch (error) {
    console.error("Error updating progress:", error.message);
    throw error;
  }
};

export const saveSession = (newSession) => {
  if (typeof newSession.user_id !== "string") {
    return {
      success: false,
      message: "Invalid user_id: must be a string",
    };
  }
  const session = new Session(newSession);
  return session.save();
};

// Service function to get all sessions for a specific user with optional filters
export const getSessions = async (userId, section, dateRange) => {
  try {
    // Build a query object based on provided parameters
    const query = { user_id: userId };

    // Add optional section filter
    if (section) {
      query.section = section;
    }

    // Add optional date range filter
    if (dateRange) {
      const [startDate, endDate] = dateRange.split(",");
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    // Execute the query to find all matching sessions
    const sessions = await Session.find(query);

    return sessions;
  } catch (error) {
    console.error("Error retrieving sessions:", error.message);
    throw error;
  }
};

export const updateSession = async (sessionId, sessionData) => {
  if (typeof sessionData.user_id !== "string") {
    return {
      success: false,
      message: "Invalid user_id: must be a string",
    };
  }
  const updatedSession = await Session.findByIdAndUpdate(
    sessionId,
    sessionData,
    {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules are applied
    }
  );

  return updatedSession;
};

import { Session, Summary } from "../models/Progress";

const base = `http://localhost:3000/progress`;

// Fetch API to save progress
export const saveSummary = async (newProgress: Summary): Promise<Summary> => {
  try {
    const response = await fetch(`${base}/summary`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProgress),
    });

    if (!response.ok) {
      throw new Error(`Error saving progress: ${response.statusText}`);
    }

    const result: Summary = await response.json();
    console.log("Progress saved:", result);
    return result;
  } catch (error) {
    console.error("Error in saveProgress:", (error as Error).message);
    throw error;
  }
};

// Fetch API to get progress for a specific user
export const getSummary = async (user_id: string): Promise<Summary> => {
  try {
    const response = await fetch(`${base}/summary?user_id=${user_id}`, {
      method: "GET",
    });

    const progress: Summary = await response.json();

    console.log("User progress:", progress);
    return progress;
  } catch (error) {
    console.error("Error in getProgress:", (error as Error).message);
    throw error;
  }
};

// Fetch API to update progress for a specific user
export const updateSummary = async (
  user_id: string,
  updatedProgress: Summary
): Promise<Summary> => {
  try {
    const response = await fetch(`${base}/summary?user_id=${user_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProgress),
    });

    if (!response.ok) {
      throw new Error(`Error updating progress: ${response.statusText}`);
    }

    const updatedData: Summary = await response.json();
    console.log("Updated progress:", updatedData);
    return updatedData;
  } catch (error) {
    console.error("Error in updateProgress:", (error as Error).message);
    throw error;
  }
};

// Fetch API to save a session
export const saveSession = async (newSession: Session): Promise<Session> => {
  try {
    const response = await fetch(`${base}/sessions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSession),
    });

    if (!response.ok) {
      throw new Error(`Error saving session: ${response.statusText}`);
    }

    const result: Session = await response.json();
    console.log("Session saved:", result);
    return result;
  } catch (error) {
    console.error("Error in saveSession:", (error as Error).message);
    throw error;
  }
};

// Fetch API to get sessions with optional filters
export const getSessions = async (
  userId: string,
  section?: string,
  dateRange?: string
): Promise<Session[]> => {
  try {
    let url = `${base}/sessions?user_id=${userId}`;

    // Add optional filters as query parameters
    if (section) url += `&section=${section}`;
    if (dateRange) url += `&dateRange=${dateRange}`;

    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
      throw new Error(`Error fetching sessions: ${response.statusText}`);
    }

    const sessions: Session[] = await response.json();
    console.log("User sessions:", sessions);
    return sessions;
  } catch (error) {
    console.error("Error in getSessions:", (error as Error).message);
    throw error;
  }
};

// Fetch API to update a session
export const updateSession = async (
  sessionId: string,
  sessionData: Session
): Promise<Session> => {
  try {
    const response = await fetch(`${base}/sessions/${sessionId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sessionData),
    });

    if (!response.ok) {
      throw new Error(`Error updating session: ${response.statusText}`);
    }

    const updatedSession: Session = await response.json();
    console.log("Updated session:", updatedSession);
    return updatedSession;
  } catch (error) {
    console.error("Error in updateSession:", (error as Error).message);
    throw error;
  }
};

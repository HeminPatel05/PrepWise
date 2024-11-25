import dotenv from "dotenv";

// dotenv.config();

const base = `http://localhost:3002/progress`;

// export const getSummary = async (user_id) => {
//   const response = await fetch(`${base}/summary?user_id=${user_id}`, {
//     method: "GET",
//   });

//   const summary = await response.json();

//   console.log(summary);
// };

// Fetch API to save progress
export const saveSummary = async (newProgress) => {
  try {
    const response = await fetch(`${base}/summary`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProgress),
    });

    if (!response.ok) {
      throw new Error(`Error saving progress: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Progress saved:", result);
    return result;
  } catch (error) {
    console.error("Error in saveProgress:", error.message);
    throw error;
  }
};

// Fetch API to get progress for a specific user
export const getSummary = async (user_id) => {
  try {
    const response = await fetch(`${base}/summary?user_id=${user_id}`, {
      method: "GET",
    });

    const progress = await response.json();

    console.log("User progress:", progress);
    return progress;
  } catch (error) {
    console.error("Error in getProgress:", error.message);
    throw error;
  }
};

// Fetch API to update progress for a specific user
export const updateSummary = async (user_id, updatedProgress) => {
  try {
    const response = await fetch(`${base}/summary?user_id=${user_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProgress),
    });

    if (!response.ok) {
      throw new Error(`Error updating progress: ${response.statusText}`);
    }

    const updatedData = await response.json();
    console.log("Updated progress:", updatedData);
    return updatedData;
  } catch (error) {
    console.error("Error in updateProgress:", error.message);
    throw error;
  }
};

// Fetch API to save a session
export const saveSession = async (newSession) => {
  try {
    const response = await fetch(`${base}/sessions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSession),
    });

    if (!response.ok) {
      throw new Error(`Error saving session: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Session saved:", result);
    return result;
  } catch (error) {
    console.error("Error in saveSession:", error.message);
    throw error;
  }
};

// Fetch API to get sessions with optional filters
export const getSessions = async (userId, section, dateRange) => {
  try {
    let url = `${base}/sessions?user_id=${userId}`;

    // Add optional filters as query parameters
    if (section) url += `&section=${section}`;
    if (dateRange) url += `&dateRange=${dateRange}`;

    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
      throw new Error(`Error fetching sessions: ${response.statusText}`);
    }

    const sessions = await response.json();
    console.log("User sessions:", sessions);
    return sessions;
  } catch (error) {
    console.error("Error in getSessions:", error.message);
    throw error;
  }
};

// Fetch API to update a session
export const updateSession = async (sessionId, sessionData) => {
  try {
    const response = await fetch(`${base}/sessions/${sessionId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sessionData),
    });

    const updatedSession = await response.json();
    console.log("Updated session:", updatedSession);
    return updatedSession;
  } catch (error) {
    console.error("Error in updateSession:", error.message);
    throw error;
  }
};

// getSummary("heminPatel");
// getSummary("user123");
// saveSession({
//   user_id: "manas",
//   section: "Verbal",
//   date: "2024-11-17T09:00:00Z",
//   duration: 67,
//   topics_covered: [
//     "Sentence Correction",
//     "Vocabulary",
//     "Text Completion",
// //     "Reading Comprehension",
// //   ],
// // });
// // getSessions("manas");
// // updateSession("6745448727bca9ad33c771d6", {
// //   user_id: "manas",
// //   section: "Verbal",
// //   date: "2024-11-17T09:00:00Z",
// //   duration: 67,
// //   topics_covered: [
// //     "Sentence Cotion",
// //     "Vocabulary",
// //     "Text Completion",
// //     "Reading Comprehension",
// //   ],
// // });
// // saveSummary({
// //   user_id: "manasss",
// //   total_questions_answered: 0,
// //   correct_answers: 0,
// //   accuracy: 0,
// //   average_time_per_question: 0,
// //   topics_weakness: [""],
// // });
// updateSummary("user123", {
//   user_id: "user123",
//   total_questions_answered: 40,
//   correct_answers: 40,
//   accuracy: 80,
//   average_time_per_question: 85.5,
//   topics_weakness: ["Probability", "Geometry", "Algebra"],
// });

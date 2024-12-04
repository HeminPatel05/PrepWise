export interface Session {
  user_id: string; // User's identifier
  section: string; // The section of the session (e.g., Verbal)
  date: string; // ISO 8601 formatted date string
  duration: number; // Duration of the session in minutes
  topics_covered: string[]; // Array of topics covered during the session
}

export interface Summary {
  user_id: string;
  total_questions_answered: number;
  correct_answers: number;
  accuracy: number; // Assuming accuracy is represented as a percentage
  average_time_per_question: number; // Time in seconds
  topics_weakness: string[]; // Array of topic names
}

export interface Payment {
  plan_id: string;
}

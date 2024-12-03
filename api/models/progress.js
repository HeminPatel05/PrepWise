import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  user_id: {
    required: true,
    type: String,
  },
  total_questions_answered: {
    required: true,
    type: Number,
  },
  correct_answers: {
    required: true,
    type: Number,
  },
  accuracy: {
    required: true,
    type: Number,
  },
  average_time_per_question: {
    required: true,
    type: Number,
  },
  topics_weakness: [String],
});

const sessionSchema = new mongoose.Schema({
  user_id: {
    required: true,
    type: String,
  },
  section: {
    required: true,
    type: String,
    enum: ["Verbal", "Quantitative"],
  },
  date: {
    required: true,
    type: Date,
  },
  duration: {
    required: true,
    type: Number,
  },
  topics_covered: [String],
});

const Progress = mongoose.model("Progress", progressSchema);
const Session = mongoose.model("Session", sessionSchema);

export { Progress, Session };

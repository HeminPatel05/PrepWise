import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Navbar from "../Navbar/Navbar";
import "./Flashcards.css";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Flashcard {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  questionID: number;
}

const Flashcards: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [lock, setLock] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [explanation, setExplanation] = useState<string>("");
  const [wrongQuestions, setWrongQuestions] = useState<Flashcard[]>([]);
  const [reviewMode, setReviewMode] = useState<boolean>(false);
  const [answers, setAnswers] = useState<any[]>([]);

  const question = reviewMode ? wrongQuestions[index] : flashcards[index];
  const optionRefs = useRef<HTMLLIElement[]>([]);

  const type = location.state?.type || "Algebra";

  useEffect(() => {
    axios
      .get<Flashcard[]>("http://localhost:3000/flashcards", { params: { type } })
      .then((response) => setFlashcards(response.data))
      .catch((error) => console.error("Error fetching flashcards:", error));
  }, [type]);

  useEffect(() => {
    const stateIndex = location.state?.index ?? 0;
    setIndex(stateIndex);
  }, [location.state]);

  useEffect(() => {
    setExplanation("");
  }, [index, flashcards, reviewMode, wrongQuestions]);

  const highlightExplanation = (text: string): string => {
    if (question) {
      const highlightedText = text.replace(
        new RegExp(`(${question.answer})`, "g"),
        `<span class="highlight">$1</span>`
      );
      return highlightedText;
    }
    return text;
  };

  const handleAnswerSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
    ansIndex: number
  ) => {
    if (!question) return;

    const selectedOptionValue = question.options[ansIndex];
    const newAnswer = {
      questionID: question.questionID,
      selectedOption: selectedOptionValue,
    };

    setAnswers((prevAnswers) => {
      const existingIndex = prevAnswers.findIndex(
        (a) => a.questionID === newAnswer.questionID
      );
      if (existingIndex !== -1) {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingIndex] = newAnswer;
        return updatedAnswers;
      }
      return [...prevAnswers, newAnswer];
    });

    checkAnswer(selectedOptionValue, ansIndex);
  };

  const checkAnswer = (selectedOption: string, ansIndex: number) => {
    if (lock || !question) return;

    const correctAnswer = question.answer;

    if (selectedOption === correctAnswer) {
      optionRefs.current[ansIndex]?.classList.add("correct");
      setScore((prev) => prev + 1);
    } else {
      optionRefs.current[ansIndex]?.classList.add("wrong");
      optionRefs.current[question.options.indexOf(correctAnswer)]?.classList.add(
        "correct"
      );
      if (!reviewMode) setWrongQuestions((prev) => [...prev, question]);

      const explanationWithHighlight = highlightExplanation(question.explanation);
      setExplanation(explanationWithHighlight);
    }

    setLock(true);
  };

  const resetStyles = () => {
    optionRefs.current.forEach((ref) => ref?.classList.remove("correct", "wrong"));
  };

  const nextQuestion = () => {
    if (!lock) {
      alert("Please select an answer before proceeding.");
      return;
    }

    resetStyles();
    const totalQuestions = reviewMode ? wrongQuestions.length : flashcards.length;

    if (index < totalQuestions - 1) {
      navigate(location.pathname, {
        state: { type, index: index + 1 },
      });
    } else if (!reviewMode && wrongQuestions.length > 0) {
      alert("Initial round completed! Reviewing incorrect questions.");
      setWrongQuestions((prev) => prev.sort(() => Math.random() - 0.5));
      setReviewMode(true);
      navigate(location.pathname, { state: { type, index: 0 } });
    } else {
      alert("Quiz completed! Thank you for participating.");
      navigate("/flashcards/FlashcardsQuantPage");
    }
    setLock(false);
  };

  const resetQuiz = () => {
    setIndex(0);
    setScore(0);
    setLock(false);
    setExplanation("");
    setWrongQuestions([]);
    setReviewMode(false);
    setAnswers([]);
    navigate(location.pathname, { state: { type, index: 0 } });
  };

  const totalQuestions = flashcards.length;
  const correctAnswers = score;
  const incorrectAnswers = totalQuestions - correctAnswers;

  const chartData = {
    labels: ["Correct", "Incorrect"],
    datasets: [
      {
        label: "Performance",
        data: [correctAnswers, incorrectAnswers],
        backgroundColor: ["#4caf50", "#f44336"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="content">
          <div className="quiz-section">
            {question ? (
              <>
                <h2>
                  Question {index + 1}: {question.question}
                </h2>
                <ul>
                  {question.options.map((option, i) => (
                    <li
                      key={i}
                      ref={(el) => (optionRefs.current[i] = el!)}
                      onClick={(e) =>
                        handleAnswerSelect(
                          { target: { value: option } } as React.ChangeEvent<HTMLInputElement>,
                          i
                        )
                      }
                    >
                      {option}
                    </li>
                  ))}
                </ul>
                {explanation && (
                  <p
                    className="explanation show"
                    dangerouslySetInnerHTML={{ __html: explanation }}
                  />
                )}
                <button onClick={nextQuestion}>
                  {index < (reviewMode ? wrongQuestions.length : flashcards.length) - 1
                    ? "Next"
                    : "Finish"}
                </button>
                <div>
                  Question {index + 1} of{" "}
                  {reviewMode ? wrongQuestions.length : flashcards.length}
                </div>
              </>
            ) : (
              <p>Loading questions...</p>
            )}
          </div>
          <div className="chart-section">
            <h2>Performance</h2>
            <Pie data={chartData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Flashcards;

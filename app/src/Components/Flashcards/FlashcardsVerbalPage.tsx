import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FlashcardsQuantPage.css";
import Navbar from "../Navbar/Navbar";

interface Section {
  title: string;
  totalQuestions: number;
  averageTimePerQuestion: number; // New feature: average time per question
}

const FlashcardVerbalPage: React.FC = () => {
  const [sections] = useState<Section[]>([
    { title: "Text Completion", totalQuestions: 5, averageTimePerQuestion: 1 },
    { title: "Reading Comprehension", totalQuestions: 5, averageTimePerQuestion: 1.2 },
    { title: "Vocabulary", totalQuestions: 5, averageTimePerQuestion: 1 },
  ]);

  const navigate = useNavigate();

  const handleStudyClick = (type: string) => {
    navigate("/flashcards", { state: { type } }); // Pass type as route state
  };

  return (
    <>
      <Navbar />
      <div className="flashcards-container">
        <h1>Verbal Practice Sections</h1>
        {sections.map((section, index) => (
          <div className="section" key={index}>
            <h2>{section.title}</h2>
            <div className="progress-container">
              <span>
                Average Time: {section.averageTimePerQuestion} min per question
              </span>
              <div className="progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{
                    width: `${(section.averageTimePerQuestion / 5) * 100}%`, // A relative display for average time
                  }}
                ></div>
              </div>
            </div>
            <button
              className="study-button"
              onClick={() => handleStudyClick(section.title)}
            >
              Study this section →
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default FlashcardVerbalPage;

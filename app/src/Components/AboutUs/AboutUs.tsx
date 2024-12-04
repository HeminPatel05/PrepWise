import React from "react";
import "./AboutUs.css";

const AboutUs: React.FC = () => {
  return (
    <div className="about-us">
      <div className="about-header">
        <h1>About Prepwise</h1>
        <p>Your ultimate companion for mastering the GRE.</p>
      </div>

      <div className="about-section">
        <h2>Our Mission</h2>
        <p>
          At Prepwise, our mission is to empower students with the tools and
          resources needed to excel in the GRE exam. We combine innovative
          technology and expert-designed content to provide a comprehensive
          preparation experience.
        </p>
      </div>

      <div className="about-features">
        <h2>Key Features</h2>
        <ul>
          <li>
            <strong>Quantitative Reasoning Module:</strong> Interactive
            exercises and detailed solutions to sharpen math and problem-solving
            skills.
          </li>
          <li>
            <strong>Verbal Reasoning Module:</strong> Tailored practice to
            improve vocabulary, reading comprehension, and sentence completion.
          </li>
          <li>
            <strong>Flashcards:</strong> An intuitive tool for memorizing
            vocabulary and reinforcing quantitative concepts.
          </li>
          <li>
            <strong>GRE Simulation Tests:</strong> Full-length tests that mimic
            the actual GRE, complete with score analysis for premium users.
          </li>
        </ul>
      </div>

      <div className="about-footer">
        <h2>Join Us</h2>
        <p>
          Prepwise is dedicated to helping you achieve your dream GRE score.
          Start your journey with us today and take the first step toward
          success.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;

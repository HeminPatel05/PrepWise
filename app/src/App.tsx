import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FlashcardQuantPage from "./Components/Flashcards/FlashcardsQuantPage";
import Flashcards from "./Components/Flashcards/Flashcards";
import FlashcardsQuantPage from "./Components/Flashcards/FlashcardsQuantPage";
import FlashcardVerbalPage from "./Components/Flashcards/FlashcardsVerbalPage";
import Progress from "./Components/Progress/Progress";
import AboutUs from "./Components/AboutUs/AboutUs";
import PaymentGateway from "./Components/Payment-Gateway/PaymentGateway";
import PageNotFound from "./Components/PageNotFound/PageNotFound";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          {/* Default route renders the FlashcardQuantPage */}
          <Route path="/" element={<FlashcardQuantPage />} />
          {/* Route to render the Flashcards page */}
          <Route path="/flashcards" element={<Flashcards />} />
          <Route
            path="/flashcards/FlashcardsQuantPage"
            element={<FlashcardsQuantPage />}
          />
          <Route path="/flashcards-verbal" element={<FlashcardVerbalPage />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/premium" element={<PaymentGateway />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/homepage" element={<HomePage />} /> {/* Home Page */}
          <Route path="/login" element={<Login />} /> {/* Login Page */}
          <Route path="/register" element={<Register />} />
          {/* Register Page */}
          <Route path="/" element={<HomePage />} />
          {/* Test List route */}
          <Route path="/tests" element={<TestList />} />
          {/* Instructions route with dynamic testId */}
          <Route path="/instructions/:testId" element={<InstructionsPage />} />
          {/* Test page route with dynamic testId */}
          <Route path="/test/:testId" element={<Test />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

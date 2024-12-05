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
import Navbar from "./Components/NavbarLR/Navbar"; // Import Navbar
import Login from "./Components/Login/Login"; // Import Login
import Register from "./Components/Register/Register"; // Import Register
import HomePage from "./Components/HomePage/HomePage"; // Import Home Page
import Success from "./Components/Payment-Gateway/Success";
import Failure from "./Components/Payment-Gateway/Failure";

const App: React.FC = () => {
  return (
    <div>
      <Navbar /> {/* Navbar */}
      <Router>
        <div /*style={{ flexGrow: 1 }}*/>
          <Routes>
            {/* Default route renders the FlashcardQuantPage */}
            <Route path="/" element={<FlashcardQuantPage />} />
            {/* Route to render the Flashcards page */}
            <Route path="/flashcards" element={<Flashcards />} />
            <Route
              path="/flashcards/FlashcardsQuantPage"
              element={<FlashcardsQuantPage />}
            />
            <Route
              path="/flashcards-verbal"
              element={<FlashcardVerbalPage />}
            />
            <Route path="/progress" element={<Progress />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/premium" element={<PaymentGateway />} />
            <Route path="/payment-success" element={<Success />} />
            <Route path="/payment-failure" element={<Failure />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/homepage" element={<HomePage />} /> {/* Home Page */}
            <Route path="/login" element={<Login />} /> {/* Login Page */}
            <Route path="/register" element={<Register />} />{" "}
            {/* Register Page */}
            {/* Test List route
          <Route path="/tests" element={<TestList />} />
          {/* Instructions route with dynamic testId */}
            {/* <Route path="/instructions/:testId" element={<InstructionsPage />} />
          {/* Test page route with dynamic testId */}
            {/* <Route path="/test/:testId" element={<Test />} /> */}
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;

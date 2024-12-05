import React from "react";
import "./Failure.css";

const Failure = () => {
  return (
    <div className="failure-container">
      <div className="failure-card">
        <h1>Payment Failed 😞</h1>
        <p>Something went wrong while processing your payment.</p>
        <p>Please try again or contact support if the issue persists.</p>
        <button
          className="failure-button retry"
          onClick={() => (window.location.href = "/premium")}
        >
          Retry Payment
        </button>
      </div>
    </div>
  );
};

export default Failure;

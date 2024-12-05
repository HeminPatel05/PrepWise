import React from "react";
import "./Success.css";

const Success = () => {
  return (
    <div className="success-container">
      <div className="success-card">
        <h1>Payment Successful! 🎉</h1>
        <p>Thank you for upgrading to Premium!</p>
        <p>Your premium features are now activated. Start exploring now!</p>
        <button
          className="success-button"
          onClick={() => (window.location.href = "/dashboard")}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Success;

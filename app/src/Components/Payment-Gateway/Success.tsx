import React, { useEffect, useState } from "react";
import "./Success.css";
import { savePayment } from "../../services/payment-service";
import { upgradeToPremium } from "../../services/api";
import { useAppSelector } from "../../services/hooks"; // Import custom typed hook

const Success = () => {
  // Get user_id from Redux state
  const userId = useAppSelector((state) => state.user.id);

  // Get session_id from query parameters
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("session_id") ?? "";

  console.log("Session ID:", sessionId);
  console.log("User ID from Redux:", userId);

  useEffect(() => {
    if (!userId || !sessionId) {
      console.error("Missing user ID or session ID.");
      return;
    }

    console.log("Calling success effect");
    savePayment({ session_id: sessionId, user_id: userId }); // Use Redux user ID
    upgradeToPremium({ user_id: userId }); // Use Redux user ID
  }, [userId, sessionId]);

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

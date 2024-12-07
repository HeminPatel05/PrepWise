import React, { useEffect, useState } from "react";
import "./Success.css";
import { savePayment } from "../../services/payment-service";
import { upgradeToPremium } from "../../services/api";
// import { savePayment } from "../../services/payment-service.ts";

const Success = () => {
  const queryParams = new URLSearchParams(location.search);
  const session_id1 = queryParams.get("session_id");
  const session_id = queryParams.get("session_id") ?? "";

  console.log("Session id1::= " + session_id1);
  console.log("Session id::= " + session_id);

  const user_id = "6750e4745e277a332f4f8515";
  const [isPremium, setIsPremium] = useState<Boolean>(false);

  useEffect(() => {
    console.log("calling success effect");
    savePayment({ session_id: session_id, user_id: "Hemin" });
    upgradeToPremium({ user_id });
  }, [session_id]);

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

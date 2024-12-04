import React, { useState } from "react";
import "./PaymentGateway.css";
import { makePayment } from "../../services/payment-service";

const PaymentGateway: React.FC = () => {
  const handlePayment = async () => {
    const plan_id = "price_1QRyu5RtqhgVOSLkdsRE0IfB";

    console.log("Payment");
    makePayment({ plan_id: plan_id });
  };
  return (
    <div className="payment-container">
      <h1 className="payment-header">Upgrade to Premium</h1>
      <p className="payment-description">
        Unlock exclusive features and enjoy the best of Prepwise with our
        premium service!
      </p>
      <p className="payment-price">Price: $49.99 USD</p>
      <button className="payment-button" onClick={() => handlePayment()}>
        Pay Now
      </button>
    </div>
  );
};

export default PaymentGateway;

import React from "react";
import "./PaymentGateway.css";
import { makePayment } from "../../services/payment-service";
import { useAppSelector } from "../../services/hooks"; // Import custom typed hook
import { useSelector } from "react-redux";
import { RootState } from "../../services/store1";

const PaymentGateway: React.FC = () => {
  const customerEmail = useAppSelector((state) => state.user.email);
  const user = useSelector((state: RootState) => state.user);
  const { id: userId, token } = user;

  console.log("userdata:::::: " + userId);

  const handlePayment = async () => {
    if (!customerEmail) {
      console.error("Customer email is not available in Redux state.");
      return;
    }

    console.log("Initiating payment for:", customerEmail);
    try {
      await makePayment({ customer_email: customerEmail }); // Pass the email dynamically
      alert("Payment initiated successfully!");
    } catch (error) {
      console.error("Error initiating payment:", error);
      alert("Failed to initiate payment. Please try again.");
    }
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

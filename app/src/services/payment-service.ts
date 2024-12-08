import { Payment, SavePayment } from "../models/Progress";

const base = `http://localhost:3000/payment`;

export const makePayment = async (data: Payment) => {
  console.log("Initiating payment");

  try {
    const response = await fetch(`${base}/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const responseData = await response.json();

    // console.log("Payment initiated", responseData.session.url);

    // Redirect to the Stripe Checkout URL
    window.location.href = responseData.session.url;
  } catch (error) {
    console.error("Payment failed", error);
  }
};

export const savePayment = async (data: SavePayment) => {
  const response = await fetch(`${base}/save-payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  console.log("save payment paayment service api response::::" + response);
};

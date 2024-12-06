import Stripe from "stripe";
import Payment from "../models/payment.js";
import * as dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const plan_id = process.env.PLAN_ID;

export const savePayment = async (newPayment) => {
  try {
    const savedPayment = await Payment.findOneAndUpdate(
      { paymentId: newPayment.paymentId },
      newPayment,
      { upsert: true, new: true }
    );
    return savedPayment;
  } catch (error) {
    if (error.name === "ValidationError") {
      console.error("Validation Error:", error.message);
    } else if (error.code === 11000) {
      console.error("Duplicate Key Error:", error.message);
    } else {
      console.error("Unknown Error:", error);
    }
    throw new Error("Failed to save payment");
  }
};

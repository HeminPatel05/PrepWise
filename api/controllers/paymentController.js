import { savePayment } from "../services/paymentService.js";
import Stripe from "stripe";
import Payment from "../models/payment.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const plan_id = process.env.PLAN_ID;

export const makePayment = async (req, res) => {
  console.log("Response::: " + res);
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: plan_id,
          quantity: 1,
        },
      ],
      success_url: `${process.env.UI_BASE}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.UI_BASE}/payment-faliure`,
      customer_email: req.body.customer_email,
    });
    console.log(session);
    return res.status(200).json({ session });
  } catch (error) {
    console.log(error);
  }
};

export const savePaymentContoller = async (req, res) => {
  const { session_id, user_id } = req.body;

  if (!session_id || !user_id) {
    return res
      .status(400)
      .json({ error: "Missing required fields: session_id or user_id" });
  }

  try {
    // Retrieve the Checkout Session
    const session = await stripe.checkout.sessions.retrieve(session_id);

    // Retrieve the Payment Intent associated with the session
    const paymentIntent = await stripe.paymentIntents.retrieve(
      session.payment_intent
    );

    if (session.status === "complete" && paymentIntent.status === "succeeded") {
      // Check if payment already exists
      const existingPayment = await Payment.findOne({ paymentId: session_id });

      if (existingPayment) {
        console.log("Payment already exists:", existingPayment);
        return res
          .status(200)
          .json({ message: "Payment already saved", existingPayment });
      }

      // Save new payment details
      const newPayment = {
        paymentId: session_id,
        amount: paymentIntent.amount / 100,
        paymentDate: new Date(paymentIntent.created * 1000),
        paymentStatus: "Completed",
        user_id,
      };

      const savedPayment = await savePayment(newPayment);

      console.log("Saved payment in controller:", savedPayment);
      return res.status(200).json({ session, paymentIntent, savedPayment });
    } else {
      return res.status(400).json({ error: "Payment not completed or failed" });
    }
  } catch (error) {
    console.error("Error in savePaymentController:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while processing payment" });
  }
};

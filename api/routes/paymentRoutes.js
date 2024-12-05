import Stripe from "stripe";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const plan_id = process.env.PLAN_ID;

const router = express.Router();

router.post("/payment", async (req, res) => {
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
      success_url: `${process.env.BASE}/payment-success`,
      cancel_url: `${process.env.BASE}/payment-faliure`,
      customer_email: req.body.customer_email,
    });
    console.log(session);
    return res.status(200).json({ session });
  } catch (error) {
    console.log(error);
  }
});

router.post("/save-payment", async (req, res) => {
  const { session_id } = req.body;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const payment = await stripe.payment.retrieve(session.payment);

    if (session.status === "complete") {
      console.log({ session, payment });
      return res.status(200).json({ session, subscription });
    }
  } catch (error) {
    console.log(error);
  }
});

export default router;

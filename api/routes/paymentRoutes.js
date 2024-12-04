import Stripe from "stripe";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const plan_id = "price_1QRyu5RtqhgVOSLkdsRE0IfB";

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
      success_url: "https://google.com/",
      cancel_url: "https://youtube.com/",
      customer_email: "hellow@gmail.com",
    });
    console.log(session);
    return res.status(200).json({ session });
  } catch (error) {
    console.log(error);
  }
});

export default router;

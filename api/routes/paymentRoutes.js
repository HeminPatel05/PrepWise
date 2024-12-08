import dotenv from "dotenv";
import express from "express";
// import Stripe from "stripe";
import {
  makePayment,
  savePaymentContoller,
} from "../controllers/paymentController.js";
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

dotenv.config();

const router = express.Router();

router.post("/payment", makePayment);

router.post("/save-payment", savePaymentContoller);

export default router;

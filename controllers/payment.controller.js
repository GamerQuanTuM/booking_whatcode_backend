import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

import { razorpayInstance } from "../index.js";
import { paymentDetailsDb } from "../services/payment.service.js";

export const checkout = async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: Number(amount * 100),
    currency: "INR",
  };

  const order = await razorpayInstance.orders.create(options);
  res.status(200).json({ message: "Success", order });
};
export const paymentVerification = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body.toString())
      .digest("hex");

    console.log("razorpay_signature", razorpay_signature);
    console.log("expectedSignature", expectedSignature);

    const isAuthentic = expectedSignature === razorpay_signature;

    console.log(expectedSignature === razorpay_signature);

    if (isAuthentic) {
      const success = await paymentDetailsDb({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
      console.log(success);
      // res.status(200).json({ success })
      res.redirect("http://localhost:3000/payment-success");
    } else {
      res.status(400).json({
        success: false,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

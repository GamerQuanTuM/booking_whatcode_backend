import { prismadb } from "../utils/prismadb.js";

export const paymentDetailsDb = async ({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
}) => {
  const savePaymentDetails = await prismadb.payment.create({
    data: {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    },
  });

  return savePaymentDetails;
};

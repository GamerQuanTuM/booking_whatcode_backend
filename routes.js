import express from "express";

import { login, register } from "./controllers/auth.controller.js";
import {
  checkout,
  paymentVerification,
} from "./controllers/payment.controller.js";
import { authenticateToken } from "./middleware.js";

const router = express.Router();

{
  /* Authenication Routes*/
}
router.post("/auth/register", register);
router.post("/auth/login", login);

{
  /* Checkout Routes */
}
router.post("/checkout", authenticateToken, checkout);
router.post("/payment-verification", authenticateToken, paymentVerification);

export default router;

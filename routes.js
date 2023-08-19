import express from "express";

import { login, register } from "./controllers/auth.controller.js";
import { checkout, paymentVerification } from "./controllers/payment.controller.js"

const router = express.Router();


{/* Authenication Routes*/ }
router.post('/auth/register', register);
router.post('/auth/login', login);

{/* Checkout Routes */ }
router.post("/checkout", checkout);
router.post("/payment-verification", paymentVerification)


export default router;
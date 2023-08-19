import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Razorpay from "razorpay"

import routes from './routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


export const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET
})

app.use('/api', routes);

app.get('/', (req, res) => {
    res.json({ message: `Backend running on PORT ${port}` });
});

app.get("/api/get-api-key", (req, res) => {
    res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
})

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

import jwt from "jsonwebtoken";

import { loginUser, registerUser } from "../services/auth.service.js";

export const register = async (req, res) => {
  const secret = process.env.JWT_SECRET;
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({ message: "Some necessary fields are missing" });
    return;
  }

  try {
    const newUser = await registerUser({ username, email, password });

    const token = jwt.sign({ userId: newUser.id }, secret, { expiresIn: "1h" });

    const { password: Password, ...userWithoutPassword } = newUser;

    res.status(201).json({ user: userWithoutPassword, token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred during registration", error });
  }
};

export const login = async (req, res) => {
  const secret = process.env.JWT_SECRET;
  const { email, password } = req.body;

  try {
    const user = await loginUser({ email, password });

    const token = jwt.sign({ userId: user.id }, secret, { expiresIn: "1h" });
    const { password: Password, ...userWithoutPassword } = user;

    res.status(200).json({ user: userWithoutPassword, token });
  } catch (error) {
    res.status(500).json({ message: "An error occurred during login", error });
  }
};

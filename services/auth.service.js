import bcrypt from "bcryptjs";

import { prismadb } from "../utils/prismadb.js";

export const registerUser = async ({ username, email, password }) => {
  const existingUser = await prismadb.user.findFirst({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("Username, email, or phone number is already taken");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prismadb.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  return newUser;
};

export const loginUser = async ({ email, password }) => {
  const user = await prismadb.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new Error("Invalid password");
  }

  return user;
};



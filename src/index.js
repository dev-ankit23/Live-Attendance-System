import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import User from "./models/userModel.js";
import * as z from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const SALT_ROUNDS = 10;

app.use(express.json());

await connectDB();

const signupSchema = z.object({
  username: z.string().min(5),
  email: z.email(),
  password: z.string().min(8),
  role: z.enum(["teacher", "student"]),
});

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

// ======================
// SIGNUP
// ======================

app.post("/signup", async (req, res) => {
  const result = signupSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      errors: result.error.issues,
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(result.data.password, SALT_ROUNDS);

    const user = await User.create({
      username: result.data.username,
      email: result.data.email,
      password: hashedPassword,
      role: result.data.role,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];

      return res.status(409).json({
        success: false,
        message: `${field} already exists`,
      });
    }

    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

// ======================
// LOGIN
// ======================

app.post("/login", async (req, res) => {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      errors: result.error.issues,
    });
  }

  try {
    const user = await User.findOne({
      email: result.data.email,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(result.data.password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import * as z from "zod";
import User from "./models/userModel.js";
import bcrypt from "bcrypt";

dotenv.config();

const app = express();
const port = process.env.PORT;
const saltRounds = 10;

app.use(express.json());

await connectDB();

const signupSchema = z.object({
  username: z.string().min(5),
  email: z.email(),
  password: z.string().min(8),
  role: z.enum(["teacher", "student"]),
});

app.post("/signup", async (req, res) => {
  // Validate Request Body
  const result = signupSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      errors: result.error.issues,
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(result.data.password, saltRounds);

    await User.create({
      username: result.data.username,
      email: result.data.email,
      password: hashedPassword,
      role: result.data.role,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    // Duplicate Key Error
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

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

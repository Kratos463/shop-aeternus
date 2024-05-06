import { connect } from "../../../dbConfig/dbConfig.js";
import bcryptjs from "bcryptjs";
import User from "../../../models/userModel.js";
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';


connect();

export default async function handler(req, res) {
  try {
    const { email, password } = req.body;

    if ([email, password].some((field) => field?.trim() === "")) {
      return res.status(400).json({ error: "Please provide all the fields information" });
    }

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User does not exist." });
    }

    // Validate the password
    const isValidPassword = await bcryptjs.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Create token data
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.TOKEN_SECRET,
      { expiresIn: '1d' } // Token expiration
    );

    // Serialize the cookie
    const serializedCookie = serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    // Set the cookie header
    res.setHeader('Set-Cookie', serializedCookie);

    // Exclude sensitive information from the user object
    const loggedUser = user.toObject();
    delete loggedUser.password;

    return res.json({
      message: "Login successful",
      success: true,
      user: loggedUser,
    });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

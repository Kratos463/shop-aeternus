import { connect } from "../../../dbConfig/dbConfig.js";
import bcryptjs from "bcryptjs";
import User from "../../../models/userModel.js";

connect();

export default async function handler(req, res) {
    try {
        const { firstName, lastName, email, phone, gender, password } = req.body;

        if ([firstName, lastName, email, phone, gender, password].some((field) =>
            field?.trim() === "")) {
            return res.status(400).json({ error: "Please provide all the fields information" });
        }

        const existedUser = await User.findOne({ email });

        if (existedUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const salt = await bcryptjs.genSalt(12);
        const hashpassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            phone,
            gender,
            password: hashpassword
        });

        await newUser.save();

        return res.status(201).json({
            message: "User successfully created",
            success: true
        });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

import { connect } from "../../../dbConfig/dbConfig.js";
import Billing from "../../../models/billingModel.js";

connect()

export async function addBillingHandler(req, res) {
    try {
        const { user, firstName, lastName, email, phone, houseNo, street, landmark, city, state, postalcode, country, alternativePhone } = req.body;

        // Validate required fields
        if (![user, firstName, email, phone, street, city, state, postalcode, country].some((field) => field?.trim() === "")) {
            return res.status(400).json({ error: "Please provide all the required information" });
        }

        // Create a new billing object
        const newBilling = new Billing({
            user,
            firstName,
            lastName,
            email,
            phone,
            houseNo,
            street,
            landmark,
            city,
            state,
            postalcode,
            country,
            alternativePhone
        });

        // Save the billing object to the database
        await newBilling.save();

        return res.status(201).json({ message: "Billing details added successfully", success: true });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

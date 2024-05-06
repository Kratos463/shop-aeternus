import { connect } from "../../../dbConfig/dbConfig.js";
import Cart from "../../../models/cartModel.js";

connect();

export async function displayCartHandler(req, res) {
    try {
        const { userId } = req.params; // Assuming userId is passed as a parameter

        // Retrieve the cart data associated with the userId
        const cart = await Cart.findOne({ user: userId }).populate('products.product');

        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }

        return res.status(200).json({ cart });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
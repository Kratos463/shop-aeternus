import { connect } from "../../../dbConfig/dbConfig.js";
import Cart from "../../../models/cartModel.js";

connect();

export default async function handler(req, res) {
    try {
        const { userId, productId, skuId, title, description, price, image, sizeId, colorId, quantity } = req.body;

        console.log("product details from backend", req.body)
        // Check if all required fields are provided
        if (![userId, productId, skuId, title, price, sizeId, colorId, image].every(field => typeof field === 'string' && field.trim() !== '') || typeof quantity !== 'number' || quantity <= 0) {
            return res.status(400).json({ error: "Please provide all the required fields and ensure quantity is a positive number" });
        }

        // Check if the user exists in the database
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            // If the user doesn't exist, create a new cart entry
            cart = new Cart({
                userId,
                items: []
            });
        }

        // Check if the item already exists in the cart
        const existingItemIndex = cart.items.findIndex(item => item.productId === productId && item.skuId === skuId);

        if (existingItemIndex !== -1) {
            // If the item exists, update its quantity
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            // If the item doesn't exist, add it to the cart
            cart.items.push({
                productId,
                skuId,
                title,
                description,
                price,
                image,
                sizeId,
                colorId,
                quantity
            });
        }

        // Save the cart to the database
        await cart.save();

        // Return success response
        return res.status(201).json({ message: "Item added to cart successfully.", success: true });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

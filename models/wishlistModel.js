import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            productId: {
                type: String,
                required: true
            },
            sku_id: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            description: String,
            price: Number,
            image: String,
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
}, { timestamps: true });

const Wishlist = mongoose.models.wishlist || mongoose.model('wishlist', wishlistSchema);

export default Wishlist;

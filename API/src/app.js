const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

// Define the whitelist for CORS
var whitelist = ['http://localhost:3000', 'https://metafortunaverse.com']

var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // Enable credentials (cookies, authorization headers, etc.)
};

// Middleware for parsing cookies
app.use(cookieParser());

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Middleware for parsing URL-encoded data
app.use(express.urlencoded({ extended: true, limit: '25kb' }));

// Configure CORS middleware with the specified options
app.use(cors(corsOptions));

// Middleware for serving static files
app.use(express.static('public'));


// Import routes and API key middleware
const apiKeyMiddleware = require('./Middleware/apikey.middleware.js');
const userRoutes = require('./Routes/user.routes.js');
const cartRoutes = require("./Routes/cart.routes.js")
const wishlistRoutes = require("./Routes/wishlist.routes.js")
const reviewRoutes = require("./Routes/review.routes.js")

// Apply API key middleware to /api routes
app.use('/api', apiKeyMiddleware);

// Apply user routes to /api/v1/user
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/wishlist', wishlistRoutes);
app.use('/api/v1/review', reviewRoutes);

module.exports = { app };
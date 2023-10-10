const express = require('express');
const router = express.Router();
const HostService = require('../services/hostService');
const hostService = new HostService()
const logger = require('../middlewares/logger');
const errorMW = require('../middlewares/errors');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Register
router.post("/register", async (req, res, next) => {
    try {
        // Check if User exists
        const existingUser = await hostService.validateByEmail(req.body.email);
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Encrypt user password
        const encryptedPassword = await bcrypt.hash(req.body.password, 10);
        const user = { ...req.body, password: encryptedPassword };

        // Register the user
        const result = await hostService.insert(user);
        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        // Create and send the token
        const token = jwt.sign(
            { userId: result.id, userName: result.name },
            process.env.TOKEN_KEY,
            { expiresIn: "2h" }
        );

        res.status(201).json({ token, result });
    } catch (error) {
        next(error);
    }
});



// Login
router.post("/login", async (req, res, next) => {
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            return res.status(400).send("All input is required");
        }

        // Validate if user exists in your database
        const user = await hostService.validateByEmail(email);

        if (!user) {
            return res.status(400).send("User not found");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).send("Invalid Credentials");
        }

        user.password = password;
        // Create and send the token
        const token = jwt.sign(
            { userId: user.id, userName: user.name },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );

        // Include the token in the response
        res.status(200).json({ token, user });
    } catch (err) {
        // Handle other errors gracefully
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.use(errorMW);
module.exports = router;


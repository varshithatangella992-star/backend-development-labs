
const express = require("express");
const db = require("./config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "lab4_secret_key_123";
const app = express();
const PORT = 3000;

// Middleware to read JSON request bodies
app.use(express.json());


// User Registration API
app.post("/register", (req, res) => {
    const { username, name, password } = req.body;

    // Check whether all fields are provided
    if (!username || !name || !password) {
        return res.status(400).json({
            message: "Username, name and password are required"
        });
    }

    // Check whether username already exists
    db.get(
        "SELECT * FROM users WHERE username = ?",
        [username],
        async (err, user) => {
            if (err) {
                return res.status(500).json({
                    message: "Database error"
                });
            }

            if (user) {
                return res.status(400).json({
                    message: "Username already exists"
                });
            }

            try {
                // Hash the password
                const hashedPassword = await bcrypt.hash(password, 10);

                // Save user details in database
                db.run(
                    "INSERT INTO users (username, name, password) VALUES (?, ?, ?)",
                    [username, name, hashedPassword],
                    function (err) {
                        if (err) {
                            return res.status(500).json({
                                message: "Registration failed"
                            });
                        }

                        res.status(201).json({
                            message: "User registered successfully",
                            user_id: this.lastID
                        });
                    }
                );
            } catch (error) {
                res.status(500).json({
                    message: "Password hashing failed"
                });
            }
        }
    );
});


// Home route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to Lab 4 - Registration, Login and JWT",
        status: "Server is running successfully"
    });
});


 // User Login API
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Check required fields
    if (!username || !password) {
        return res.status(400).json({
            message: "Username and password are required"
        });
    }

    // Find user by username
    db.get(
        "SELECT * FROM users WHERE username = ?",
        [username],
        async (err, user) => {
            if (err) {
                return res.status(500).json({
                    message: "Database error"
                });
            }

            // Check whether user exists
            if (!user) {
                return res.status(400).json({
                    message: "Invalid username"
                });
            }

            try {
                // Compare entered password with stored hash
                const isPasswordCorrect = await bcrypt.compare(
                    password,
                    user.password
                );

                if (!isPasswordCorrect) {
                    return res.status(400).json({
                        message: "Invalid password"
                    });
                }

                // Generate JWT token with username only
                const token = jwt.sign(
                    { username: user.username },
                    SECRET_KEY
                );

                res.status(200).json({
                    jwt_token: token
                });

            } catch (error) {
                res.status(500).json({
                    message: "Login failed"
                });
            }
        }
    );
});


// Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

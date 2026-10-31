
const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

// Home route
app.get("/", (req, res) => {
    res.status(200).send("Welcome to my Node.js and Express Lab 1 Server!");
});

// About route
app.get("/about", (req, res) => {
    res.status(200).json({
       name: "Tangella Varshitha",
       section: "CSE-2E"
    });
});

// Time route
app.get("/time", (req, res) => {
    res.status(200).json({
        currentDateTime: new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata"
})
    });
});

// 404 route
app.use((req, res) => {
    res.status(404).send("404 - Page Not Found");
});

// Start server
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});

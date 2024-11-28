// Import required modules
const express = require("express");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for pretty JSON response
app.set("json spaces", 2);

// Route to check user status
app.get("/check", (req, res) => {
    const id = req.query.id;

    if (!id) {
        return res.status(400).send("ID is required");
    }

    // Read the vip.txt file
    fs.readFile("vip.txt", "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading file");
        }

        const ids = data.split("\n");
        if (ids.includes(id)) {
            return res.send("Premium");
        } else {
            return res.send("Free User");
        }
    });
});

// Route to add a user ID
app.get("/add", (req, res) => {
    const id = req.query.id;

    if (!id) {
        return res.status(400).send("ID is required");
    }

    // Append the ID to the vip.txt file
    fs.appendFile("vip.txt", id + "\n", (err) => {
        if (err) {
            return res.status(500).send("Error writing to file");
        }
        return res.send("Done Add");
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

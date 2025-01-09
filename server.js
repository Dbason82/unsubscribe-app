const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

// Middleware to serve static files (if needed later)
app.use(express.static(path.join(__dirname, "public")));

// Redirect the root path ("/") to "/unsubscribe"
app.get("/", (req, res) => {
  res.redirect("/unsubscribe");
});

// Serve the unsubscribe page at /unsubscribe
app.get("/unsubscribe", (req, res) => {
  res.sendFile(path.join(__dirname, "unsubscribe.html"));
});

// Handle form submission for unsubscribing
app.use(express.urlencoded({ extended: true })); // Middleware to parse form data
app.post("/unsubscribe", (req, res) => {
  const email = req.body.email;

  if (!email) {
    return res.status(400).send("Email is required.");
  }

  // Save the email to a file (or a database in a real app)
  const fs = require("fs");
  const filePath = path.join(__dirname, "unsubscribed_emails.txt");

  fs.appendFile(filePath, `${email}\n`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("An error occurred. Please try again.");
    }

    console.log(`Unsubscribed: ${email}`);
    res.send("You have been unsubscribed.");
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

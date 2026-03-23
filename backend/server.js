const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ ADD HERE (right after middleware)
mongoose.connect("mongodb://25bcac54_db_user:AVhVGWEqxTPsRHcs@ac-ppwqfdp-shard-00-00.awwemyr.mongodb.net:27017,ac-ppwqfdp-shard-00-01.awwemyr.mongodb.net:27017,ac-ppwqfdp-shard-00-02.awwemyr.mongodb.net:27017/?ssl=true&replicaSet=atlas-6d7eq5-shard-0&authSource=admin&appName=Cluster0")
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => {
  console.log("❌ FULL DB ERROR:");
  console.log(err);
});

// Schema
const Contact = mongoose.model("Contact", {
  name: String,
  email: String,
  message: String
});

// Route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.post("/contact", async (req, res) => {
  try {
    const newMsg = new Contact(req.body);
    await newMsg.save();
    res.send("Message sent successfully!");
  } catch (err) {
    res.status(500).send("Error sending message");
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
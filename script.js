const express = require("express");
const mongoose = require("./db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// USER MODEL
const User = mongoose.model("User", {
    email: String,
    password: String
});

// REGISTER
app.post("/register", async (req, res) => {
    const hashed = await bcrypt.hash(req.body.password, 10);

    const user = new User({
        email: req.body.email,
        password: hashed
    });

    await user.save();
    res.json({ message: "User created" });
});

// LOGIN
app.post("/login", async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).send("User not found");

    const valid = await bcrypt.compare(req.body.password, user.password);

    if (!valid) return res.status(400).send("Wrong password");

    const token = jwt.sign({ id: user._id }, "secret");

    res.json({ token });
});
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/bootcamp");

module.exports = mongoose;
async function register() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ email, password })
    });

    alert("Registered!");
}

async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    localStorage.setItem("token", data.token);

    alert("Logged in!");
}
const axios = require("axios");

// M-Pesa route
app.post("/pay", async (req, res) => {
    // same STK push logic as before
    res.json({ message: "STK Push sent" });
});
async function payNow(amount) {
    const phone = prompt("Enter phone (2547XXXXXXXX)");

    await fetch("http://localhost:3000/pay", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ phone, amount })
    });

    alert("Check your phone to complete payment");
}
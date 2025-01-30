const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const Book = require("./models/Book");
const authMiddleware = require("./middlewares/auth");
const Cart = require("./models/Cart");

const app = express();
app.use(express.json()); // Middleware to parse JSON data
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));
// Middleware to enable CORS

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://keerthana:keerthana@cluster0.vals6.mongodb.net/")
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Error connecting to database:", err));

// User Schema and Model
const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// Signup route
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      id: uuidv4(),
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email" });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(400).json({ message: "Invalid password" });

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, "secret_key", { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// CRUD Routes for Books

// Get all cart items
app.get("/cart", async (req, res) => {
  try {
    const cartItems = await Cart.find();
    res.status(200).json(cartItems);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cart items" });
  }
});

// Add item to cart
app.post("/cart", async (req, res) => {
  try {
    const { id, title, author, description, price, coverImage, quantity } =
      req.body;
    let existingItem = await Cart.findOne({ id });

    if (existingItem) {
      existingItem.quantity += 1;
      await existingItem.save();
      return res.status(200).json(existingItem);
    } else {
      const newItem = new Cart({
        id,
        title,
        author,
        description,
        price,
        coverImage,
        quantity,
      });
      await newItem.save();
      return res.status(201).json(newItem);
    }
  } catch (err) {
    res.status(500).json({ message: "Error adding to cart" });
  }
});

// Remove item from cart
app.delete("/cart/:id", async (req, res) => {
  try {
    await Cart.findOneAndDelete({ id: req.params.id });
    res.status(200).json({ message: "Item removed from cart" });
  } catch (err) {
    res.status(500).json({ message: "Error removing item from cart" });
  }
});

app.post("/checkout", async (req, res) => {
  try {
    await Cart.deleteMany({});
    res
      .status(200)
      .json({ message: "Checkout successful! Cart is now empty." });
  } catch (err) {
    res.status(500).json({ message: "Error during checkout." });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

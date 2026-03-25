const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Email regex validation (fallback for frontend validation)
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!emailRegex.test(email)) return res.status(400).json({message: "Invalid email syntax"});

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.json({ message: "Login successful", username: user.email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 0 });
  res.json({ message: "Logged out successfully" });
};

exports.checkAuth = (req, res) => {
  const token = req.cookies.jwt;
  if(!token) return res.status(401).json({authenticated: false});
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    res.json({authenticated: true, user: decoded.id});
  } catch(err) {
    res.status(401).json({authenticated: false});
  }
};

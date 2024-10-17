const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register User
const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

     
        const hashedPassword = await bcrypt.hash(password, 10);

      
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

       
        const token = jwt.sign({ id: newUser._id }, 'secret_key', { expiresIn: '1m' });

        // Set the token in an HTTP-only cookie
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict',maxAge:"3600000"});

        // Respond with user ID and name
        res.status(201).json({ id: newUser._id, name: newUser.name });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Login User
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, 'secret_key', { expiresIn: '1m' });

        // Set the token in an HTTP-only cookie
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict' });
        res.status(200).json({ id: user._id, name: user.name });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in' });
    }
};

module.exports = { register, login };

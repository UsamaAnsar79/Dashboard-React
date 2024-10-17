
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const { MONGO_URI } = require('./config/db');
const permissionsRoutes = require('./routes/permissions');
const roleRoutes = require('./routes/roleRoutes');
const userRoutes =require('./routes/userRoutes')

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', permissionsRoutes);
app.use('/roles', roleRoutes);
app.use('/users',userRoutes)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
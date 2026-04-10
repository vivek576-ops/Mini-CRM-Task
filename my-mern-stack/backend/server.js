const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 1. Middleware
app.use(cors()); // Allows frontend to access backend
app.use(express.json()); // Allows backend to read JSON data

// 2. Lead Routes
const leadRoutes = require('./routes/LeadRoutes');
app.use('/api/leads', leadRoutes);

// 3. Test Route (to check if API is working)
app.get('/', (req, res) => res.send("CRM API is Running..."));

// 4. Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch(err => console.log("❌ DB Connection Error:", err));

// 5. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
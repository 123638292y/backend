
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./lib/lib.js'); 
const authRoutes = require('./routers/authrouter');
require('dotenv').config();

connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

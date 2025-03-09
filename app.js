// server.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./env/env");
const http = require("http");
const cors = require('cors');
const adminRoutes = require('./routes/Adminroutes');
const errorHandler = require('./utils/errorHandler');
const { initializeSocket } = require("./utils/socketmanger")
const messageRoutes = require("./routes/chat")
const userRoutes = require("./routes/chatusers")
const cookieParser = require('cookie-parser');

// Charger les variables d'environnement
dotenv.config();
// Initialiser l'application Express
const app = express();
const server = http.createServer(app)
initializeSocket(server);

// Middleware pour CORS (il faut d'abord initialiser l'app)
// Configure CORS
const corsOptions = {
    origin: 'http://localhost:3000', // L'origine de ton frontend
    credentials: true, // Permet d'envoyer des cookies avec la requête
};

app.use(cors(corsOptions)); // Appliquer cette configuration à toutes les routes

app.use(cookieParser());

// Connexion à la base de données MongoDB
connectDB();

// Middleware pour gérer les requêtes JSON
app.use(express.json());

app.use(errorHandler);
// Routes d'authentification (seulement signup ici)
app.use('/api/admin', adminRoutes);
app.use("/api/users", userRoutes)
app.use("/api/messages", messageRoutes)
// Lancer le serveur sur un port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

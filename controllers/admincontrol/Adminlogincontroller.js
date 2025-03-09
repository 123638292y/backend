const Admin = require('../../models/amdin'); // Correction du chemin
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Chargement des variables d'environnement

const login = async (req, res) => {
    console.log("🔍 Requête reçue avec:", req.body); // Ajout pour débogage

    const { username, password, role } = req.body;

    try {
        const admin = await Admin.findOne({ username });
        if (!admin) {
            console.log("⚠️ Admin non trouvé");
            return res.status(404).json({ message: 'Admin not found' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            console.log("⚠️ Mot de passe incorrect");
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Vérifie le rôle
        if (admin.role !== role) {
            console.log(`⚠️ Mauvais rôle: attendu ${role}, reçu ${admin.role}`);
            return res.status(403).json({ message: `You do not have ${role} rights` });
        }

        admin.isOnline = true;
        admin.lastActive = Date.now();
        await admin.save();

        // Générer le token JWT
        const token = jwt.sign({ id: admin._id, role: admin.role }, 'your_jwt_secret', { expiresIn: '1h' });

        console.log("✅ Connexion réussie pour", admin.username);
        return res.status(200).json({ token, username: admin.username, role: admin.role });

    } catch (error) {
        console.error("🔥 Erreur serveur:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const logout = async (req, res) => {
    try {
      // Update user status to offline
      req.admin.isOnline = false
      req.admin.lastActive = Date.now()
      await req.admin.save()
  
      res.json({ message: "Logged out successfully" })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }







module.exports = { login, logout };

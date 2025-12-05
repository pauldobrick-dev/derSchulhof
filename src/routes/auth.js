// auth.js - Authentication module
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../database');

const numSaltRounds = 8;

// REGISTER
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body; // Müssen mit den Namen aus Template übereinstimmen

    console.log('Empfangene Daten:', { username, email, password }); // Zum Debuggen

    // Validierung
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Alle Felder erforderlich' });
    }

    try {
        // Passwort hashen (mit await!)
        const password_hash = await bcrypt.hash(password, numSaltRounds);
        console.log("Password hash: ", password_hash);
    } catch (error) {
        res.status(500).json({ error: 'Hashing-Fehler' });
    }
})

module.exports = router;
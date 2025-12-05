// auth.js - Authentication module
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../database');

const numSaltRounds = 10;

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

        // In Datenbank speichern
        db.run(`INSERT INTO Benutzerprofile (username, email, password_hash) VALUES (?,?,?)`,
            [username, email, password_hash],
            function(err) {
                if(err) {
                    return res.status(500).json({ error: 'Fehler: ' + err.message });
                }

                res.status(201).json({
                    message: 'Registrierung erfolgreich!',
                    user_id: this.lastID
                });
            }
            );

    } catch (error) {
        res.status(500).json({ error: 'Hashing-Fehler' });
    }
})

// LOGIN
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username und Passwort erforderlich' });
    }

    // User aus Datenbank holen
    db.get(
        `SELECT * FROM Benutzerprofile WHERE username = ?`,
        [username],
        async (err, user) => {
            if (err) {
                return res.status(500).json({ error: 'Datenbankfehler' });
            }

            if (!user) {
                return res.status(401).json({ error: 'Falscher Username oder Passwort' });
            }

            // Passwort vergleichen mit bcrypt
            const passwordMatch = await bcrypt.compare(password, user.password_hash);

            if (!passwordMatch) {
                return res.status(401).json({ error: 'Falscher Username oder Passwort' });
            }

            // Erfolg!
            res.json({
                message: 'Login erfolgreich!',
                user: {
                    user_id: user.user_id,
                    username: user.username,
                    email: user.email
                }
            });
        }
    );
});

module.exports = router;
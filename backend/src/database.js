const sqlite3 = require("sqlite3").verbose(); // Includes sqlite3 with detailed error handling
const path = require("path"); // Includes "path"

// Include chatforum.db file
const dbPath = path.join(__dirname, '..', 'chatforum.db'); // Navigates to recent folder -> one folder up -> chatforum.db
const db = new sqlite3.Database(dbPath); // Uses chatforum.db | creates chatforum.db if non existend

// Create table
db.serialize(() => {
    // Userprofile table
    db.run(`CREATE TABLE IF NOT EXISTS Benutzerprofile (
                user_id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                last_login DATETIME
            )`);

    console.log('✅ Datenbank-Tabellen erstellt/überprüft');
});

module.exports = db;
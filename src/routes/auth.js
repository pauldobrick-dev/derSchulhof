// auth.js - Authentication module

const express = require('express');

const router = express.Router();

// Authentication page route
router.get('/auth', (req, res) => {
    res.send("Authentication page");
});

module.exports = router;
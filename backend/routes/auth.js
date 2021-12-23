const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Creating User: POST "/api/auth"
router.post('/', (req, res) => {
    const user = User(req.body);
    user.save();
    res.send("User Created Successfully");
});

module.exports = router;
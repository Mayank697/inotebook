const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Creating User: POST "/api/auth"
router.post('/', [
    body('name').isLength({ min: 5 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
],(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }).then(user => res.json(user))
    .catch(err => {
        console.log(err)
        res.json({error: "Please enter a valid email"})
    })
});

module.exports = router;
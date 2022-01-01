const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'm@y@nk$6715';

// Creating User: POST "/api/auth/createuser"
//              Params: { name: String, email: String(unique), password: String}
//              Success(200) Status: return user(obj) 
//              Status(400): msg => "User with this email already exists"
//              Status(500): msg => "Some error occured" (for internal server errors)
router.post('/createuser', [
    body('name').isLength({ min: 5 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
],async (req, res) => {
    // Any error or bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check whether user already exists or not
        let user = await User.findOne({email: req.body.email});
        if(user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password);
    
        // Create new User
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);

        res.json({authtoken});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
});

module.exports = router;
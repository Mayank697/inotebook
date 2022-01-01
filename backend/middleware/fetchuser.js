const jwt = require('jsonwebtoken');
const JWT_SECRET = "m@y@nk$6715";

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');

    if(!token) {
        res.send({error: "Please authenticate with valid token"}).status(401);
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        console.error(error.message);
        res.status(401).send("Access denied");
    }
}

module.exports = fetchuser;
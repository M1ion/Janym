const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config.js');

const authMiddleware = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;

    if (accessToken) {
        jwt.verify(accessToken, JWT_SECRET, (err, decoded) => {
            if (err) {
                return next();
            }
            req.user = decoded;
            req.loggedIn = true;
            console.log('req.user', JSON.stringify(req.user));
            return next();
        });
    } else {
        return next();
    }
};

module.exports = authMiddleware;
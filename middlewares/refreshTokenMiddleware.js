const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config.js');
const extractPayload = (decryptedToken) => {
    const {iat, exp, ...payload} = decryptedToken;
    return payload;
}

/**
 * Refresh access token if only access token was expired
 */
const refreshTokenMiddleware = async (req, res, next) => {
    const {accessToken, refreshToken} = req.cookies;

    jwt.verify(refreshToken, REFRESH_SECRET, (err, decodedRefreshToken) => {
        // If refresh token is invalid, then don't attempt to refresh access token
        if (err) {
            return next();
        }

        jwt.verify(accessToken, JWT_SECRET, (err, decodedAccessToken) => {
            if (err) {
                // If access token was expired, then refresh it
                if (err instanceof jwt.TokenExpiredError) {
                    const newAccessToken = jwt.sign({...extractPayload(decodedRefreshToken)}, JWT_SECRET, {
                        algorithm: 'HS256',
                        expiresIn: JWT_EXP
                    });

                    res.cookie('accessToken', newAccessToken, {expiresIn: `${JWT_EXP}s`});
                    // We need to update the access token in the request object
                    // because the authMiddleware doesn't see yet the new access token
                    req.cookies.accessToken = newAccessToken;
                    return next();
                }
                // Otherwise, return error
                return next(err);
            }

            // If access token is valid, then don't attempt to refresh it
            return next();
        });
    });
};

module.exports = refreshTokenMiddleware;

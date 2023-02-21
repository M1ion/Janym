const jwt = require('jsonwebtoken');
const {users, JWT_SECRET, JWT_EXP, REFRESH_SECRET, REFRESH_EXP} = require('../config.js');
const express = require('express');
const router = express.Router();

const signIn = (req, res, next) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({message: 'Username and password are required!'});
    }

    const user = users.find(user => user.username === username && user.password === password);

    if (!user) {
        return res.status(401).json({message: 'Invalid username or password!'});
    }

    const accessToken = jwt.sign({username}, JWT_SECRET, {
        algorithm: 'HS256', expiresIn: JWT_EXP
    });

    const refreshToken = jwt.sign({username}, REFRESH_SECRET, {
        algorithm: 'HS256', expiresIn: REFRESH_EXP
    });

    res.cookie('accessToken', accessToken, {expiresIn: `${JWT_EXP}s`});
    res.cookie('refreshToken', refreshToken, {expiresIn: `${REFRESH_EXP}s`});
    res.status(200).json({message: 'Successfully signed in!'});
};

const signUp = (req, res, next) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({message: 'Username and password are required!'});
    }

    const user = {username, password};

    users.push(user);

    res.status(200).json({message: 'Successfully signed up!'});
};

const secretPage = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({message: 'You are not authenticated!'});
    }

    res.status(200).json({message: 'You are on the secret page!', payload: req.user});
};

const signOut = (req, res, next) => {
    res.cookie('accessToken', '', {expiresIn: '0s'});
    res.cookie('refreshToken', '', {expiresIn: '0s'});
    res.status(200).json({message: 'Successfully signed out!'});
};

router.post('/sign_in', signIn);
router.post('/sign_up', signUp);
router.get('/secret', secretPage);
router.get('/sign_out', signOut);

module.exports = router;
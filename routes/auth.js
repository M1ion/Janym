const jwt = require('jsonwebtoken');
const {users, JWT_SECRET, JWT_EXP, REFRESH_SECRET, REFRESH_EXP} = require('../config.js');
const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

const signIn = async (req, res, next) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({message: 'Username and password are required!'});
    }

    const user = await User.findOne({username: username, password: password});

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

const signUp = async (req, res, next) => {
    const {username, password, email} = req.body;

    if (!username || !password) {
        return res.status(400).json({message: 'Username and password are required!'});
    }

    const user = {username, password, email};

    const newUser = await User.create(user);

    res.status(200).json({message: 'Successfully signed up!', user: newUser});
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

const initDB = async (req, res, next) => {
    await User.deleteMany({});
    await User.insertMany(users);
    res.status(200).json({message: 'Successfully initialized DB!'});
}

const getAll = async (req, res, next) => {
    const users = await User.find({});
    for (let user of users) {
        user.password = undefined;
    }
    res.status(200).json({users});
}

const changeUser = async (req, res, next) => {
    const {username, password, email, coupleId} = req.body;

    if (username !== req.user.username) {
        return res.status(403).json({message: 'You are not allowed to change this user!'});
    }

    const user = await User.findOne({username: username});

    if (password) {
        user.password = password;
    }

    if (email) {
        user.email = email;
    }

    if (coupleId) {
        user.coupleId = coupleId;
    }

    const response = await User.update({username: username}, user);

    res.status(200).json({message: 'Successfully signed up!', response});
}

router.post('/sign_in', signIn);
router.post('/sign_up', signUp);
router.get('/secret', secretPage);
router.get('/sign_out', signOut);
router.get('/init', initDB);
router.get('/all', getAll);
router.post('/change', changeUser);

module.exports = router;
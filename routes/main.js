const { Router } = require('express')
const router = Router()
const user = require('../models/user')
const couple = require('../models/couple');
const desire = require('../models/desire');
const event = require('../models/event');

router.get('/', async (req, res) => {
  res.render('MainPage');
  });

// isAuth добавить: router.get('', isAuth, async (req, res) => {
router.get('/profile', async (req, res) => {
  res.render('Profile');
})

router.get('/couple', async (req, res) => {
  res.render('Couple');
})

router.get('/event', async (req, res) => {
  res.render('Event');
})

router.get('/desires', async (req, res) => {
  res.render('Desires');
})

router.get('/quiz', async (req, res) => {
  res.render('Quiz');
})

router.get('/login', async (req, res) => {
  res.render('Login');
})

router.get('/register', async (req, res) => {
  res.render('Registration');
})

module.exports = router;
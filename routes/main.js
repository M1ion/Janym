const { Router } = require("express");
const router = Router();
const user = require("../models/user.js");
const couple = require("../models/couple.js");
const desire = require("../models/desire.js");
const event = require("../models/event.js");
const createError = require("http-errors");

router.get("/", async (req, res) => {
  console.log(Boolean(req.user));
  res.render("MainPage", { isLogged: req.user });
});

// isAuth добавить: router.get('', isAuth, async (req, res) => {
router.get("/profile", async (req, res) => {
  // res.render('Profile');
  if (!req.user) {
    return res.redirect("/login");
  }
  const userFound = await user.findOne({ username: req.user.username });

  res.render("Profile", { isLogged: req.user, username: userFound.username, email: userFound.email, password: userFound.password });
});

router.get("/couple", async (req, res) => {
  res.render("Couple", { isLogged: req.user });
});

router.get("/event", async (req, res) => {
  res.render("Event", { isLogged: req.user });
});

router.get("/desires", async (req, res) => {
  res.render("Desires", { isLogged: req.user });
});

router.get("/quiz", async (req, res) => {
  res.render("Quiz", { isLogged: req.user });
});

router.get("/login", async (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("Login", { isLogged: req.user });
});

router.get("/register", async (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("Registration", { isLogged: req.user });
});

module.exports = router;

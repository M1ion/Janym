const { Router } = require("express");
const router = Router();
const user = require("../models/user.js");
const couple = require("../models/couple.js");
const desire = require("../models/desire.js");
const event = require("../models/event.js");
const createError = require("http-errors");

router.get("/", async (req, res) => {
  console.log(Boolean(req.user));
  res.render("MainPage", { username: req.user.username, });
});

// isAuth добавить: router.get('', isAuth, async (req, res) => {
router.get("/profile", async (req, res) => {
  // res.render('Profile');
  if (!req.user) {
    return res.redirect("/login");
  }
  const userFound = await user.findOne({ username: req.user.username });
  console.log(userFound);
  let coupleFound = null;
  if (
    userFound.coupleId &&
    Object.keys(userFound.coupleId).length > 0 &&
    userFound.coupleId.constructor === Object
  ) {
    console.log("coupleId", userFound.coupleId);
    coupleFound = await user.findOne({ _id: userFound.coupleId });
    console.log("coupleFound", coupleFound);
  }

  res.render("Profile", {
    username: req.user.username,
    email: userFound.email,
    password: userFound.password,
    couple: coupleFound,
    proposals: userFound.proposals,
    id: userFound._id,
  });
});

router.get('/accept/:id', async (req, res) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  const userFound = await user.findOne({ username: req.user.username });
  if (!userFound.proposals.includes(req.params.id)) {
    return next("400", "You don't have this proposal");
  }
  const coupleFound = await couple.findOne({ _id: req.params.id });
  userFound.coupleId = coupleFound._id;
  userFound.proposals = [];
  await userFound.save();
  coupleFound.coupleId = userFound._id;
  coupleFound.proposals = [];
  await coupleFound.save();
  res.redirect(req.get("referer"));
});

router.get('/decline/:id', async (req, res) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  const userFound = await user.findOne({ username: req.user.username });
  const coupleFound = await user.findOne({ _id: req.params.id });
  coupleFound.proposals = coupleFound.proposals.filter(
    (proposal) => proposal != userFound._id
  );
  await coupleFound.save();
  res.redirect(req.get("referer"));
});
  

router.get("/follow/:id", async (req, res) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  const userFound = await user.findOne({ username: req.user.username });
  const coupleFound = await user.findOne({ _id: req.params.id });
  if (userFound.couples && userFound.couples.includes(coupleFound._id)) {
    return res.redirect(req.get("referer"));
  }
  // userFound.couples.push(coupleFound._id);
  coupleFound.proposals.push(userFound._id);
  await coupleFound.save();
  res.redirect(req.get("referer"));
});

router.get("/couple", async (req, res) => {
  res.render("Couple", { username: req.user.username, });
});

router.get("/event", async (req, res) => {
  res.render("Event", { username: req.user.username, });
});

router.get("/desires", async (req, res) => {
  res.render("Desires", { username: req.user.username, });
});

router.get("/quiz", async (req, res) => {
  res.render("Quiz", { username: req.user.username, });
});

router.get("/login", async (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("Login", { username: req.user.username, });
});

router.get("/register", async (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("Registration", { username: req.user.username, });
});

module.exports = router;

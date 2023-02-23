const { Router } = require("express");
const router = Router();
const user = require("../models/user.js");
const createError = require("http-errors");
const image = require("../models/image.js");

router.get("/", async (req, res) => {
  console.log(Boolean(req.user));
  res.render("MainPage", { username: req.loggedIn });
});

// isAuth добавить: router.get('', isAuth, async (req, res) => {
router.get("/profile", async (req, res) => {
  // res.render('Profile');
  if (!req.user) {
    return res.redirect("/login");
  }
  const userFound = await user.findOne({ username: req.user.username });
  let coupleFound = null;
  if (
    userFound.coupleId
  ) {
    console.log("coupleId", userFound.coupleId);
    coupleFound = await user.findById(userFound.coupleId);
    console.log("coupleFound", coupleFound);
  }

  const foundImage = await image.findById(userFound.photoUrl);

  res.render("Profile", {
    name: userFound.username,
    username: req.loggedIn,
    email: userFound.email,
    password: userFound.password,
    couple: coupleFound,
    proposals: userFound.proposals,
    id: userFound._id,
    image: foundImage,
  });
});

router.get("/accept/:id", async (req, res, next) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  const userFound = await user.findOne({ username: req.user.username });
  console.log("/accept/:id", JSON.stringify(userFound));
  let found = false;
  for (let proposal of userFound.proposals) {
    console.log(proposal);
    if (proposal._id == req.params.id) {
      found = true;
      break;
    }
  }
  if (!found) return next(createError(400, "You don't have this proposal"));
  const coupleFound = await user.findById(req.params.id);
  console.log("/accept/:id", JSON.stringify(coupleFound));
  userFound.coupleId = coupleFound._id;
  userFound.proposals = [];
  await userFound.save();
  coupleFound.coupleId = userFound._id;
  coupleFound.proposals = [];
  await coupleFound.save();
  res.redirect(req.get("referer"));
});

router.get("/decline/:id", async (req, res, next) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  const userFound = await user.findOne({ username: req.user.username });
  userFound.proposals = userFound.proposals.filter(
    // (proposal) => proposal._id != mongoose.Types.ObjectId(req.params.id)
    (proposal) => {
      return proposal._id.toString() != req.params.id;
    }
  );
  await userFound.save();
  res.redirect(req.get("referer"));
});

router.get("/follow/:id", async (req, res, next) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  const userFound = await user.findOne({ username: req.user.username });
  const coupleFound = await user.findOne({ _id: req.params.id });
  if (coupleFound.couples && coupleFound.proposals.includes(coupleFound._id)) {
    return res.redirect(req.get("referer"));
  }
  if (JSON.stringify(userFound._id) == JSON.stringify(coupleFound._id)) {
    return next(createError(400, "You can't follow yourself"));
  }
  coupleFound.proposals.push(userFound._id);
  await coupleFound.save();
  res.redirect(req.get("referer"));
});

router.get("/couple", async (req, res) => {
  const users = await user.find({});
  res.render("Couple", { users, username: req.loggedIn });
});

router.get("/event", async (req, res) => {
  res.render("Event", { username: req.loggedIn });
});

router.get("/desires", async (req, res) => {
  res.render("Desires", { username: req.loggedIn });
});

router.get("/quiz", async (req, res) => {
  res.render("Quiz", { username: req.loggedIn });
});

router.get("/login", async (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("Login", { username: req.loggedIn });
});

router.get("/register", async (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("Registration", { username: req.loggedIn });
});

module.exports = router;

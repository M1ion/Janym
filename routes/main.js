const { Router } = require("express");
const router = Router();
const user = require("../models/user.js");
const event = require("../models/event.js")
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
    firstName: userFound.firstName,
    lastName: userFound.lastName,
    DateOfBirth: userFound.DateOfBirth,
    gender: userFound.gender,
    country: userFound.country,
    city: userFound.city, 
    bio: userFound.bio, 
    socalMedia: userFound.socalMedia,
    phoneNumber: userFound.phoneNumber,
    password: userFound.password,
    couple: coupleFound,
    proposals: userFound.proposals,
    id: userFound._id,
    image: foundImage,
    coupleId: userFound.coupleId
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
  const foundImages = [];
  for (let user of users) {
    const foundImage = await image.findById(user.photoUrl);
    foundImages.push(foundImage);
  }
  res.render("Couple", { users, username: req.loggedIn, images: foundImages });
});

router.get("/event", async (req, res) => {
  const events = await event.find({});
  const couples = [];
  for (let event of events) {
    // const couple = [event.coupleId[0], event.coupleId[1]];
    const firstUser = await user.findById(event.coupleId[0]);
    const secondUser = await user.findById(event.coupleId[1]);
    const couple = [firstUser.username, secondUser.username];
    couples.push(couple);
  }
  res.render("Event", { events, username: req.loggedIn, couples });
});

router.get('/add_event', async (req, res, next) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  const currUser = await user.findOne({ username: req.user.username });
  if (!currUser.coupleId) {
    return next(createError(400, "You don't have a couple"));
  }
  res.render('AddEvent', { username: req.loggedIn });
});

router.post('/add_event', async (req, res, next) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  const currUser = await user.findOne({ username: req.user.username });
  if (!currUser.coupleId) {
    return next(createError(400, "You don't have a couple"));
  }
  const {eventName, date, photoUrl} = req.body;
  const obj = {
    eventName,
    coupleId:[currUser._id, currUser.coupleId]
  };
  if (date) {
    obj.date = date;
  }
  if (photoUrl) {
    obj.photoUrl = photoUrl;
  }
  const newEvent = new event(obj);
  await newEvent.save();
  res.redirect('/event');
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

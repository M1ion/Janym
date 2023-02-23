const express = require("express");
const router = express.Router();
const imgModel = require("../models/image");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const process = require("process");
const directory = path.join(__dirname + "/../uploads/");
console.log(directory);
const user = require("../models/user.js");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdirSync(directory, { recursive: true });
    cb(null, directory);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

router.post("/:id", upload.single("image"), async (req, res, next) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  const userFound = await user.findOne({ username: req.user.username });
  const obj = {
    name: req.body.name,
    desc: req.body.desc,
    img: {
      data: fs.readFileSync(
        path.join(directory + req.file.filename)
      ),
      contentType: "image/png",
    },
  };
  const uploadedImage = await imgModel.create(obj);

  userFound.photoUrl = uploadedImage._id;

  await userFound.save();

  res.redirect("/profile");
});

router.get("/", (req, res) => {
  imgModel.find({}, (err, items) => {
    if (err) {
      console.log(err);
      res.status(500).send("An error occurred", err);
    } else {
      res.render("imagesPage", { items: items });
    }
  });
});

router.use((req, res, next) => {
    console.log("Hello, World!");
    next();
});

router.post("/", upload.single("image"), (req, res, next) => {
  console.log("Inside post controller");
  const obj = {
    name: req.body.name,
    desc: req.body.desc,
    img: {
      data: fs.readFileSync(
        path.join(directory + req.file.filename)
      ),
      contentType: "image/png",
    },
  };
  console.log("Succesfully uploaded");
  imgModel.create(obj, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("./");
    }
  });
});

module.exports = router;

const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models");
const passport = require("passport");
const router = express.Router();

// 미들웨어 확장(next 사용을 위해)
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.err(loginErr);
        return next(loginErr);
      }
      return res.status(200).json(user);
    });
  })(req, res, next);
});

router.post("/", async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send("이미 사용중인 이메일입니다.");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3060");
    res.status(201).send("ok");
  } catch (error) {
    console.error(error);
    next(error); // status 500
  }
});

router.post("/user/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("ok");
});

module.exports = router;

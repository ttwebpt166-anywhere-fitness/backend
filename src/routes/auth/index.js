const { createUser, findUser } = require("./models");
const { checkRegBody, userExist } = require("./middleware");
const { Router } = require("express");
const argon = require("argon2");
const jwt = require("jsonwebtoken");
const userReturn = require("../utils/userReturn");

const auth = Router();

/**
 * Create User Post
 */
auth.post("/register", checkRegBody, async (req, res) => {
  const { username, password, isTeacher = false } = req.body;
  const requireDetails = {
    username: username.toLowerCase(),
    password: await argon.hash(password),
  };
  requireDetails.account_type = isTeacher ? "teacher" : "student";
  try {
    let user = await createUser(requireDetails);
    user = await findUser(
      !!user[0] && typeof user[0] === "number"
        ? user[0]
        : requireDetails.username
    );
    console.log("User: ", user);
    const token = jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET, {
      expiresIn: "24h",
    });
    req.session.userId = user.id;
    res.json({ user: userReturn(user), token });
  } catch (error) {
    if (
      error.errno === 19 ||
      error.code == 23505 ||
      (typeof error.detail === "string" &&
        error.detail.includes("already exists"))
    ) {
      res.status(500).json({ error: { message: "Username is taken" } });
      return;
    }
    res.status(501).json({
      message:
        "The user might have been made, but an error happened when sending it back to you",
    });
    console.log(error);
    return;
  }
});

auth.post("/login", checkRegBody, userExist, async (req, res) => {
  const isPswdVerified = await argon.verify(
    req.user.password,
    req.body.password
  );

  const { id } = req.user;

  if (!isPswdVerified) {
    res.status(400).json({ error: { message: "Invalid Credentials" } });
    return;
  }

  const token = jwt.sign({ userId: id }, process.env.TOKEN_SECRET, {
    expiresIn: "24h",
  });
  req.session.userId = id;
  res.json({ user: userReturn(req.user), token });
});

module.exports = auth;

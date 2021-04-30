const { findUser } = require("./models");

const checkString = (string) => {
  const regex = /[!@#\$%\^\&*\)\(+=._-]+$/g;
  return typeof string === "string" && !string.match(regex);
};

const checkRegBody = (req, res, next) => {
  const { body } = req;
  const toCheck = ["username", "password"];
  for (const key of toCheck) {
    const element = body[key];
    if (!element) {
      res.status(400).json({
        error: {
          field: key,
          title: "Insufficient Information",
          message: `missing ${key}`,
          entry: element,
        },
      });
      return;
    } else if (element.length <= 3) {
      res.status(400).json({
        error: {
          field: key,
          title: "Invalid Entry",
          message: `${key} is not long enough`,
          entry: element,
        },
      });
      return;
    }
    if (key === "username") {
      if (!checkString(element)) {
        res.status(400).json({
          field: key,
          title: "Invalid Entry",
          message: `${key} is not an acceptable entry`,
          entry: element,
        });
        return;
      }
    }
  }
  next();
};

const userExist = async (req, res, next) => {
  const user = await findUser(req.body.username.toLowerCase());
  if (!user.username) {
    res.status(400).json({ error: { message: "User doesn't exist" } });
    return;
  }

  req.user = user;
  next();
};

module.exports = { checkRegBody, userExist };

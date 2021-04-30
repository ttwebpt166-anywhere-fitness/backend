const jwt = require("jsonwebtoken");
const { url } = require("../../constants");
const { findUser } = require("../routes/auth/models");

module.exports = async (req, res, next) => {
  if (!req.user?.username) {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    if (!token) {
      res.status(404).json({
        error: {
          message: "Not Authorized",
          redirectLink: `${url}/auth/login`,
        },
      });
      return;
    }
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      if (decoded.exp > Date.now()) {
        res.status(400).json({
          error: {
            message: "Not Authorized",
            redirectLink: `${url}/auth/login`,
          },
        });
        return;
      }
      const user = await findUser(decoded.userId);
      if (!user.username) {
        res.status(400).json({
          error: {
            message: "Not Authorized",
            redirectLink: `${url}/auth/login`,
          },
        });
        return;
      }
      req.session.userId = user.id;
      req.user = user;
    } catch (error) {
      if (error.message.includes("jwt expired")) {
        res.status(400).json({
          error: {
            message: "Not Authorized",
            redirectLink: `${url}/auth/login`,
          },
        });
        return;
      }
    }
  }
  next();
};

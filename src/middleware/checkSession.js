const { findUser } = require("../routes/auth/models");

const checkSession = async (req, res, next) => {
  const { userId } = req.session;
  const { _expires } = req.session.cookie;
  if (userId) {
    const user = await findUser(Number(userId));
    if (new Date(_expires).getTime() < Date.now()) {
      if (user.username) {
        req.user = user;
        next();
      } else {
        next();
      }
    } else {
      next();
    }
  } else {
    next();
  }
};
module.exports = checkSession;

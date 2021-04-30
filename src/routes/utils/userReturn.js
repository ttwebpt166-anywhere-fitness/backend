const userReturn = (user) => {
  let userRet = {};
  for (const key in user) {
    if (key !== "password" && key !== "id") {
      userRet = { ...userRet, [key]: user[key] };
    }
  }
  return userRet;
};

module.exports = userReturn;

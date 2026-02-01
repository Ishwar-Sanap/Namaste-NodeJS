const userAuth = (req, res, next) => {
  const token = "TrueUser";
  const isAuthorized = token == "TrueUser";
  if (isAuthorized) {
    next();
  } else {
    res.status(401).send("Unauthorized user...");
  }
};

const adminAuth = (req, res, next) => {
  const token = "NoTaskaree";
  const isAuthorized = token === "NoTaskaree";
  if (isAuthorized) {
    next();
  } else {
    res.status(401).send("Unauthorized admin..");
  }
};

module.exports = {
  adminAuth,
  userAuth,
};

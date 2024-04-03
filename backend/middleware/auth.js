const db = require("../models/");
const Users = db.users;

const authenticate = async (req, res, next) => {
  try {
    const userObject = req.header("Authorization");
    const userId = JSON.parse(userObject).id;
    // console.log("id - ", userId);
    const query = await Users.findByPk(userId).then((user) => {
      if (user === null) {
        return res
          .status(401)
          .json({ success: false, error: "User Authentication Failed" });
      } else {
        // console.log("query - ", user);
        req.user = user;
        next();
      }
    });
  } catch (error) {
    return res.status(401).json({ success: false, error: error.message });
    // throw new Error(error);
  }
};

module.exports = {
  authenticate,
};

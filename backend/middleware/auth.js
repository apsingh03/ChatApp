const db = require("../models/");
const Users = db.users;

const authenticate = (req, res, next) => {
  try {
    const userObject = req.header("Authorization");

    const userId = JSON.parse(userObject).id;
    // console.log( "id - " , userId );
    Users.findByPk(userId).then((user) => {
      // console.log( " user - " , user );
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(401).json({ success: false, error: error.message });
    // throw new Error(error);
  }
};

module.exports = {
  authenticate,
};

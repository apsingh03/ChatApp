const router = require("express").Router();

const usersController = require("../controller/usersController.js");
const userAuthentication = require("../middleware/auth.js");

router.get("/getAllUsers", usersController.getAllUsers);
router.post("/createUser", usersController.createUser);
router.post("/loginUser", usersController.loginUser);
router.post(
  "/createChat",
  userAuthentication.authenticate,
  usersController.createChatMessage
);
router.get(
  "/getChats",
  userAuthentication.authenticate,
  usersController.getChatsMessage
);

module.exports = router;

const router = require("express").Router();

const usersController = require("../controller/usersController.js");

router.get("/getAllUsers", usersController.getAllUsers);
router.post("/createUser", usersController.createUser);
router.post("/loginUser", usersController.loginUser);

module.exports = router;

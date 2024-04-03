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
router.get(
  "/getwithWhomConversations",
  userAuthentication.authenticate,
  usersController.getwithWhomConversations
);
router.get(
  "/getChatsLength",
  userAuthentication.authenticate,
  usersController.getChatsLength
);

router.get(
  "/getUserJoinedGroups",
  userAuthentication.authenticate,
  usersController.getUserJoinedGroups
);

router.get(
  "/getGroupByIdChatsLength/:groupId",
  userAuthentication.authenticate,
  usersController.getGroupByIdChatsLength
);

router.get(
  "/getGroupById/:groupId",
  userAuthentication.authenticate,
  usersController.getGroupById
);

router.post(
  "/createGroupChat",
  userAuthentication.authenticate,
  usersController.createGroupChatMessage
);

router.post(
  "/createGroup",
  userAuthentication.authenticate,
  usersController.createGroup
);

router.get(
  "/allGroup",
  userAuthentication.authenticate,
  usersController.allGroup
);

router.post(
  "/joinGroupViaInvitationLink",
  userAuthentication.authenticate,
  usersController.joinGroupViaInvitationLink
);

router.get(
  "/getAboutGroupById",
  userAuthentication.authenticate,
  usersController.getAboutGroupById
);

router.get(
  "/getAllGroupsJoinedUser",
  userAuthentication.authenticate,
  usersController.getAllGroupsJoinedUser
);

router.post(
  "/joinGroupVia/",
  userAuthentication.authenticate,
  usersController.joinGroupViaUserId
);

router.delete(
  "/removeFromGroupVia/:userId",
  userAuthentication.authenticate,
  usersController.removeFromGroupViaUserId
);

module.exports = router;

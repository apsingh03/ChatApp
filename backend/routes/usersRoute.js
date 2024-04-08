/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *         - mobile
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description: Its Unique
 *         email:
 *           type: string
 *           description: user Email
 *         password:
 *           type: string
 *           description: user password
 *         mobile:
 *           type: string
 *           description: user's mobile no
 *         createdAt :
 *           type: string
 *           format: date
 *           description: The date the user was added
 *         updatedAt :
 *           type: string
 *           format: date
 *           description: The date the book was updated
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Chat:
 *       type: object
 *       required:
 *         - message
 *         - idsCode
 *         - user_id
 *         - withWhom
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the Chat
 *         message:
 *           type: string
 *           description: message data
 *         idsCode:
 *           type: string
 *           description: user and withWhom Ids combination eg - 1with4 , 4with1
 *         user_id:
 *           type: integer
 *           description: user id
 *         withWhom:
 *           type: integer
 *           description: withWhom User id he / she chatting with
 *         createdAt :
 *           type: string
 *           format: date
 *           description: The date the user was added
 *         updatedAt :
 *           type: string
 *           format: date
 *           description: The date the book was updated
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Group:
 *       type: object
 *       required:
 *         - name
 *         - inviteLink
 *         - totalUsers
 *         - admin_id
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the Group
 *         name:
 *           type: string
 *           description: Group name
 *         inviteLink:
 *           type: string
 *           description: unique generated group link
 *         totalUsers:
 *           type: integer
 *           description: every time when new user join the group it will increament with 1
 *         admin_id:
 *           type: integer
 *           description: userId
 *         createdAt :
 *           type: string
 *           format: date
 *           description: The date the group was added
 *         updatedAt :
 *           type: string
 *           format: date
 *           description: The date the group was updated
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     GroupMessage:
 *       type: object
 *       required:
 *         - message
 *         - group_id
 *         - user_id
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the Group
 *         message:
 *           type: string
 *           description: user sended message
 *         group_id:
 *           type: integer
 *           description: message belongs to which group
 *         user_id:
 *           type: integer
 *           description: user id
 *         createdAt :
 *           type: string
 *           format: date
 *           description: The date the group was added
 *         updatedAt :
 *           type: string
 *           format: date
 *           description: The date the group was updated
 */
const router = require("express").Router();

const usersController = require("../controller/usersController.js");
const userAuthentication = require("../middleware/auth.js");
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: all users apis
 * users/getAllUsers:
 *   get:
 *     summary: Comp list of users
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       500:
 *         description: Some server error
 *
 */
router.get("/getAllUsers", usersController.getAllUsers);
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: all users apis
 * users/createUser:
 *   post:
 *     summary: create a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       500:
 *         description: Some server error
 *
 */
router.post("/createUser", usersController.createUser);
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: all users apis
 * users/loginUser:
 *   post:
 *     summary: user logins
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       500:
 *         description: Some server error
 *
 */
router.post("/loginUser", usersController.loginUser);
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: all users apis
 * users/createChat:
 *   post:
 *     summary: create a chat with userId & withWhom
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Chat'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chat'
 *       500:
 *         description: Some server error
 *
 */
router.post(
  "/createChat",
  userAuthentication.authenticate,
  usersController.createChatMessage
);
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: all users apis
 * users/getChats:
 *   post:
 *     summary: get all user chats
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Chat'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chat'
 *       500:
 *         description: Some server error
 *
 */
router.get(
  "/getChats",
  userAuthentication.authenticate,
  usersController.getChatsMessage
);
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: all users apis
 * users/getwithWhomConversations:
 *   post:
 *     summary: get user is chatting with which user
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Chat'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chat'
 *       500:
 *         description: Some server error
 *
 */
router.get(
  "/getwithWhomConversations",
  userAuthentication.authenticate,
  usersController.getwithWhomConversations
);
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: all users apis
 * users/getChatsLength:
 *   get:
 *     summary: get  user chat length
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Chat'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chat'
 *       500:
 *         description: Some server error
 *
 */
router.get(
  "/getChatsLength",
  userAuthentication.authenticate,
  usersController.getChatsLength
);
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: all users apis
 * users/getUserJoinedGroups:
 *   get:
 *     summary: get all users who joined groups
 *     tags: [GroupMessage]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GroupMessage'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GroupMessage'
 *       500:
 *         description: Some server error
 *
 */
router.get(
  "/getUserJoinedGroups",
  userAuthentication.authenticate,
  usersController.getUserJoinedGroups
);
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: all users apis
 * users/getGroupByIdChatsLength/:groupId:
 *   get:
 *     summary: get all group messages length
 *     tags: [GroupMessage]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GroupMessage'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GroupMessage'
 *       500:
 *         description: Some server error
 *
 */
router.get(
  "/getGroupByIdChatsLength/:groupId",
  userAuthentication.authenticate,
  usersController.getGroupByIdChatsLength
);
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: all users apis
 * users/getGroupById/:groupId:
 *   get:
 *     summary: get group detail by id
 *     tags: [GroupMessage]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GroupMessage'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GroupMessage'
 *       500:
 *         description: Some server error
 *
 */
router.get(
  "/getGroupById/:groupId",
  userAuthentication.authenticate,
  usersController.getGroupById
);
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: all users apis
 * users/createGroupChat:
 *   post:
 *     summary: create group chat with userId & groudId
 *     tags: [GroupMessage]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GroupMessage'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GroupMessage'
 *       500:
 *         description: Some server error
 *
 */
router.post(
  "/createGroupChat",
  userAuthentication.authenticate,
  usersController.createGroupChatMessage
);
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: all users apis
 * users/createGroup:
 *   post:
 *     summary: create new group
 *     tags: [Group]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Group'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
 *       500:
 *         description: Some server error
 *
 */
router.post(
  "/createGroup",
  userAuthentication.authenticate,
  usersController.createGroup
);
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: all users apis
 * users/allGroup:
 *   get:
 *     summary: list of all groups
 *     tags: [Group]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Group'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
 *       500:
 *         description: Some server error
 *
 */
router.get(
  "/allGroup",
  userAuthentication.authenticate,
  usersController.allGroup
);
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: all users apis
 * users/joinGroupViaInvitationLink:
 *   post:
 *     summary: create a welcome user message in GroupMessage
 *     tags: [GroupMessage]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GroupMessage'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GroupMessage'
 *       500:
 *         description: Some server error
 *
 */
router.post(
  "/joinGroupViaInvitationLink",
  userAuthentication.authenticate,
  usersController.joinGroupViaInvitationLink
);
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: all users apis
 * users/getAboutGroupById:
 *   get:
 *     summary: get group detail by group id
 *     tags: [Group]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Group'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
 *       500:
 *         description: Some server error
 *
 */
router.get(
  "/getAboutGroupById",
  userAuthentication.authenticate,
  usersController.getAboutGroupById
);
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: all users apis
 * users/getAllGroupsJoinedUser:
 *   get:
 *     summary: get user joined groups
 *     tags: [GroupMessage]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GroupMessage'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GroupMessage'
 *       500:
 *         description: Some server error
 *
 */
router.get(
  "/getAllGroupsJoinedUser",
  userAuthentication.authenticate,
  usersController.getAllGroupsJoinedUser
);
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: all users apis
 * users/joinGroupVia:
 *   post:
 *     summary: join group with user_id & group_id
 *     tags: [GroupMessage]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GroupMessage'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GroupMessage'
 *       500:
 *         description: Some server error
 *
 */
router.post(
  "/joinGroupVia/",
  userAuthentication.authenticate,
  usersController.joinGroupViaUserId
);
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: all users apis
 * /users/removeFromGroupVia/:userId:
 *   delete:
 *     summary: delete a user from group
 *     tags: [GroupMessage]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GroupMessage'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GroupMessage'
 *       500:
 *         description: Some server error
 *
 */
router.delete(
  "/removeFromGroupVia/:userId",
  userAuthentication.authenticate,
  usersController.removeFromGroupViaUserId
);

module.exports = router;

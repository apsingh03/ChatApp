const db = require("../models");
const bcrypt = require("bcrypt");

// Tables
const Users = db.users;
const Chat = db.chat;
const Group = db.group;
const GroupMessage = db.groupMessage;
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

const getAllUsers = async (req, res) => {
  const query = await Users.findAll({
    attributes: { exclude: ["password"] },
  });
  res.status(200).send({ msg: "List of all users", users: query });
};

const createUser = async (req, res) => {
  try {
    // console.log("Req.body - ", req.body);
    const emailExistQuery = await Users.findOne({
      where: { email: req.body.email },
    });
    const usernameExistQuery = await Users.findOne({
      where: { username: req.body.username },
    });

    if (emailExistQuery) {
      if (emailExistQuery.email === req.body.email) {
        return res.status(200).send({ msg: "Email Already Exist" });
      }
    } else if (usernameExistQuery) {
      if (usernameExistQuery.username === req.body.username) {
        return res.status(200).send({ msg: "Username Already Exist" });
      }
    } else {
      const saltRounds = 10;

      bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
        const query = await Users.create({
          username: req.body.username,
          email: req.body.email,
          password: hash,
          mobile: req.body.mobile,
          createdAt: Date.now(),
        });

        return res.status(200).send({ msg: "Sign Up Successful" });
      });
    }
  } catch (error) {
    console.log("createUser Error - ", error);
    return res.status(500).send({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const emailExistQuery = await Users.findOne({
      where: { email: req.body.email },
    });

    if (emailExistQuery) {
      bcrypt.compare(
        req.body.password,
        emailExistQuery.password,
        function (err, result) {
          if (err) {
            return res.status(500).send({ msg: "Something went wrong" });
          }

          if (result) {
            const { id, username, email, createdAt } = emailExistQuery;
            const userObject = { id, username, email, createdAt };
            return res
              .status(200)
              .send({ msg: "Logged In Successfull", userObject: userObject });
          } else {
            return res.status(200).send({ msg: "Password Wrong" });
          }
        }
      );
    } else {
      return res.status(200).send({ msg: "User Doesn't Exist" });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const createChatMessage = async (req, res) => {
  try {
    const user = req.user;

    const chattingWithWhom =
      req.user.id.toString() + "with" + req.body.withWhomId.toString();
    // console.log("chattingWithWhom - " , chattingWithWhom );
    const query = await Chat.create({
      message: req.body.message,
      idsCode: chattingWithWhom,
      user_id: req.user.id,
      withWhom: req.body.withWhomId,
      createdAt: new Date(),
    });

    const { id, email, username, mobile } = req.user;

    const result = {
      id: query.id,
      message: query.message,
      user_id: query.user_id,
      withWhom: query.withWhom,
      createdAt: query.createdAt,
      user: {
        id,
        email,
        username,
        mobile,
      },
    };

    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getChatsMessage = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const itemsPerPage = parseInt(req.query.itemsPerPage);
    const withWhomId = parseInt(req.query.withWhomId);
    const senderIdsCode = req.query.idsCode;
    const receiverIdsCode =
      senderIdsCode.substring(6, 8) + "with" + senderIdsCode.substring(0, 2);

    const query = await Chat.findAndCountAll({
      include: [
        {
          model: Users,
          required: true,
          as: "user",
          attributes: { exclude: ["password", "createdAt", "updatedAt"] },
        },
        {
          model: Users,
          required: true,
          as: "withWhomUser",
          attributes: { exclude: ["password", "createdAt", "updatedAt"] },
        },
      ],

      where: {
        // [Sequelize.Op.or]: [
        //   { user_id: req.user.id, withWhom: withWhomId },
        //   { withWhom: req.user.id },
        // ],

        [Sequelize.Op.or]: [
          { idsCode: senderIdsCode },
          { idsCode: receiverIdsCode },
        ],
      },
      order: [["id", "ASC"]],
      offset: (page - 1) * itemsPerPage,
      limit: itemsPerPage,
    });
    // console.log("query", query.count);
    return res.status(200).send(query);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getChatsLength = async (req, res) => {
  try {
    const withWhomId = parseInt(req.query.withWhomId);
    const chatQuery = await Chat.count({
      // where: [{ user_id: req.user.id }, { withWhom: withWhomId }],
    });
    // console.log( "chatQuery - " , chatQuery )

    return res.status(200).send({ success: true, length: chatQuery });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getUserJoinedGroups = async (req, res) => {
  try {
    const { user } = req.user;

    const groupQuery = await GroupMessage.findAll({
      attributes: ["group_id"],

      include: [
        {
          model: Group,
          required: true,
        },
      ],
      group: ["group_id"],
      where: { user_id: req.user.id },
      order: [["id", "ASC"]],
    });

    const data = groupQuery.map(({ group }) => group);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getGroupByIdChatsLength = async (req, res) => {
  try {
    const chatQuery = await GroupMessage.count({
      where: { group_id: req.params.groupId },
    });
    // console.log( "chatQuery - " , chatQuery )

    return res.status(200).send({ success: true, length: chatQuery });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getGroupById = async (req, res) => {
  try {
    const { user } = req.user;
    const groupId = req.params.groupId;

    const page = parseInt(req.query.page);
    const itemsPerPage = parseInt(req.query.itemsPerPage);

    const groupQuery = await GroupMessage.findAndCountAll({
      include: [
        {
          model: Users,
          required: true,
          attributes: {
            exclude: ["password", "createdAt", "updatedAt"],
          },
        },
      ],
      attributes: { exclude: ["updatedAt"] },
      where: { group_id: groupId },

      order: [["id", "ASC"]],
      offset: (page - 1) * itemsPerPage,
      limit: itemsPerPage,
    });

    return res.status(200).send(groupQuery);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const createGroupChatMessage = async (req, res) => {
  try {
    const user = req.user;

    const query = await user.createGroupMessage({
      message: req.body.message,
      group_id: req.body.groupId,
      createdAt: new Date(),
    });

    const { id, email, username, mobile } = req.user;

    const result = [
      {
        id: query.id,
        message: query.message,
        user_id: query.user_id,
        group_id: query.group_id,
        createdAt: query.createdAt,
        user: {
          id,
          email,
          username,
          mobile,
        },
      },
    ];

    // Emit a socket event to inform clients about the new message
    io.emit("newMessage", result);

    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getwithWhomConversations = async (req, res) => {
  try {
    const user = req.user;
    // Sender
    const queryLength = await Chat.findAndCountAll({
      where: [{ user_id: req.user.id }],
      group: "withWhom",
    });

    // console.log( "queryLength" , queryLength?.count[0]?.count )

    if (queryLength?.count[0]?.count > 0) {
      // console.log("if query- ", req.user.id);

      const queryIf = await Chat.findAll({
        attributes: ["withWhom", "idsCode"],
        include: [
          // {
          //   model: Users,
          //   required: true,
          //   as: "user",
          //   attributes: { exclude: ["password", "createdAt", "updatedAt"] },
          // },
          {
            model: Users,
            required: true,
            as: "withWhomUser",
            attributes: { exclude: ["password", "createdAt", "updatedAt"] },
          },
        ],
        where: [{ user_id: req.user.id }],
        group: "withWhom",
      });

      return res.status(200).send(queryIf);
    } else {
      // console.log("else  query- " , req.user.id  );

      const queryElse = await Chat.findAll({
        attributes: ["user_id", "idsCode"],
        include: [
          {
            model: Users,
            required: true,
            as: "user",
            attributes: { exclude: ["password", "createdAt", "updatedAt"] },
          },
          // {
          //   model: Users,
          //   required: true,
          //   as: "withWhomUser",
          //   attributes: { exclude: ["password", "createdAt", "updatedAt"] },
          // },
        ],

        where: [{ withWhom: req.user.id }],
        group: "user_id",
      });

      return res.status(200).send(queryElse);
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

function generateInviteLink(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let inviteLink = "";

  for (let i = 0; i < length; i++) {
    inviteLink += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return inviteLink;
}

const createGroup = async (req, res) => {
  try {
    const { user } = req.body;
    const randomInviteLink = generateInviteLink(20);

    const query = await Group.create({
      name: req.body.groupName,
      inviteLink: "/invitation/" + randomInviteLink,
      totalUsers: 0,
      createdAt: new Date(),
      admin_id: req.user.id,
    });

    return res.status(200).send(query);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const allGroup = async (req, res) => {
  try {
    const query = await Group.findAll({
      // include : [
      //   {
      //     model : Users,
      //     require : true,
      //     attributes : {"exclude" : ["password"] }
      //   }
      // ]
    });

    return res.status(200).send(query);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const joinGroupViaInvitationLink = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const userAlreadyJoinedOrNotQuery = await GroupMessage.findOne({
      where: { user_id: req.user.id },
      // group : "user_id"
    });

    if (userAlreadyJoinedOrNotQuery) {
      return res.status(200).send({ msg: "User Already in this Group" });
    } else {
      // step 1 increase total users from Group table
      // step 2 create a message on group messages

      const user = req.user;

      const invition = "/invitation/" + req.body.inviteLink;

      const findQuery = await Group.findOne({
        where: { inviteLink: invition },
        transaction: t,
      });
      // console.log("invition - ", invition);
      if (findQuery) {
        // console.log("qtry - ", findQuery.totalUsers);

        await Group.update(
          { totalUsers: findQuery.totalUsers + 1 },

          { where: { inviteLink: invition }, transaction: t }
        );

        const createGroupMessageQuery = await user.createGroupMessage(
          {
            message: `Welcome ${user.username}`,
            group_id: findQuery.id,
            createdAt: new Date(),
          },
          { transaction: t }
        );

        await t.commit();

        return res.status(200).send({
          msg: "You have Joined this Group",
          query: createGroupMessageQuery,
        });
      }
    }
  } catch (error) {
    await t.rollback();
    return res.status(500).send({ error: error.message });
  }
};

const getAboutGroupById = async (req, res) => {
  try {
    const groupId = parseInt(req.query.groupId);

    const query = await Group.findOne({
      where: { id: groupId },
    });

    return res.status(200).send(query);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getAllGroupsJoinedUser = async (req, res) => {
  try {
     const groupId = parseInt(req.query.groupId);
    const getAllGroupsJoinedUserQuery = await GroupMessage.findAll({
      attributes: ["user_id"],
      group: "user_id",
      where: { group_id: groupId },
    });

    return res.status(200).send(getAllGroupsJoinedUserQuery);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const joinGroupViaUserId = async (req, res) => {
  const t = await sequelize.transaction();

  try {
   
    const userId = req.body.userId;
    const groupId = req.body.groupId;

    // console.log("userId - " , userId );
    // console.log("groupId - " , groupId );

    const userAlreadyJoinedOrNotQuery = await GroupMessage.findOne({
      where: [{ user_id: userId }, { group_id: groupId }],
    });

    if (userAlreadyJoinedOrNotQuery) {
      return res.status(200).send({ msg: "User Already in this Group" });
    } else {
      // step 1 increase total users from Group table
      // step 2 create a message on group messages

      const findGroupQuery = await Group.findOne({
        where: { id: groupId },
        transaction: t,
      });
      // console.log("invition - ", invition);
      if (findGroupQuery) {
        // console.log("totalUsers - ", findGroupQuery.totalUsers);

        await Group.update(
          { totalUsers: findGroupQuery.totalUsers + 1 },

          { where: { id: groupId }, transaction: t }
        );

        const createGroupMessageQuery = await GroupMessage.create(
          {
            message: `Congs Admin Added You`,
            group_id: findGroupQuery.id,
            user_id: userId,
            createdAt: new Date(),
          },
          { transaction: t }
        );

        await t.commit();

        return res.status(200).send({
          msg: "You have Joined this User",
          // query: createGroupMessageQuery,
        });
      }
    }
  } catch (error) {
    await t.rollback();
    return res.status(500).send({ error: error.message });
  }
};

const removeFromGroupViaUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    const query = await GroupMessage.destroy({
      where: { user_id: req.params.userId },
    });

    res.status(200).send({ msg: "User Removed From this Group" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  loginUser,
  createChatMessage,
  getChatsMessage,
  getChatsLength,
  getUserJoinedGroups,
  getGroupById,
  getGroupByIdChatsLength,
  createGroupChatMessage,
  getwithWhomConversations,
  createGroup,
  allGroup,
  joinGroupViaInvitationLink,
  getAboutGroupById,
  getAllGroupsJoinedUser,
  joinGroupViaUserId,
  removeFromGroupViaUserId,
};

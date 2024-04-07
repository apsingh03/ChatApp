const { Sequelize, DataTypes } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(
  process.env.DBNAME,
  process.env.DBUSER,
  process.env.DBPASSWORD,
  {
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    dialect: "mysql",
    operatorsAliases: false,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Sequelize Connected");
  })
  .catch((error) => {
    console.log("/n /n sequelize Authenticate Error - ", error);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// table name
db.users = require("./UsersModel.js")(sequelize, DataTypes);
db.chat = require("./ChatModel.js")(sequelize, DataTypes);
db.group = require("./GroupModel.js")(sequelize, DataTypes);
db.groupMessage = require("./GroupMessageModel.js")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("------------ Congratulation You are in Sync -------------- ");
});

db.users.hasMany(db.chat, {
  foreignKey: "user_id",
  as: "user",
});

db.chat.belongsTo(db.users, {
  foreignKey: "user_id",
  as: "user",
});

db.users.hasMany(db.chat, {
  foreignKey: "withWhom",
  as: "withWhomUser",
});

db.chat.belongsTo(db.users, {
  foreignKey: "withWhom",
  as: "withWhomUser",
});

db.group.hasMany(db.groupMessage, {
  foreignKey: "group_id",
});

db.groupMessage.belongsTo(db.group, {
  foreignKey: "group_id",
});

db.users.hasMany(db.groupMessage, {
  foreignKey: "user_id",
});

db.groupMessage.belongsTo(db.users, {
  foreignKey: "user_id",
});

db.users.hasMany(db.group, {
  foreignKey: "admin_id",
});

db.group.belongsTo(db.users, {
  foreignKey: "admin_id",
});

module.exports = db;

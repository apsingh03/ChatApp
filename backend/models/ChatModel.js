module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define(
    "Chat",
    {
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      idsCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );

  Chat.associate = (models) => {
    Chat.belongsTo(models.users, {
      foreignKey: "user_id",
      as: "user",
    });

    Chat.belongsTo(models.users, {
      foreignKey: "withWhom",
      as: "withWhomUser",
    });
  };

  return Chat;
};

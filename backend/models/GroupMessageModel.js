module.exports = (sequelize, DataTypes) => {
  const GroupMessage = sequelize.define(
    "groupMessage",
    {
      message: {
        type: DataTypes.TEXT,
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

  return GroupMessage;
};

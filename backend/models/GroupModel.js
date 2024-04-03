module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define(
    "group",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      inviteLink: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      totalUsers: {
        type: DataTypes.INTEGER,
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

  return Group;
};

import { DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  sequelize.define(
    "UserMapping",
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      meteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {}
  );
};

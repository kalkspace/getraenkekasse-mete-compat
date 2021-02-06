import { Sequelize } from "sequelize";

import userMappingDefiner from "./models/userMapping";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "user-mapper.sqlite",
  logQueryParameters: true,
});

const modelDefiners = [userMappingDefiner];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

export default sequelize;

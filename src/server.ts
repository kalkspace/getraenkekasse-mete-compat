import * as express from "express";
import sequelize from "./db";
import userMappingRouter from "./routers/userMappingRouter";
import meteApiUsersRouter from "./routers/meteApiUsersRouter";

const port = process.env.PORT ? process.env.PORT : 3003;

const app = express();
app.use(express.json());
app.use("/user-mapping/", userMappingRouter);
app.use("/api/v1/users", meteApiUsersRouter);

sequelize.sync({}).then(() => {
  app.listen(port, () => {
    console.log(
      `Getraenkekasse-Mete-Compat app listening at http://localhost:${port}`
    );
  });
});

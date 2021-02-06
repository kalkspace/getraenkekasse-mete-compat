import { Request, Response, Router } from "express";
import asyncRequestHandler from "../utils/asyncHandler";
import sequelize from "../db";

const router = Router();
router.post(
  "/",
  asyncRequestHandler(async (req: Request, res: Response) => {
    const userMapping = await sequelize.models.UserMapping.create(req.body);
    res.json(userMapping);
  })
);
router.get(
  "/:id",
  asyncRequestHandler(async (req: Request, res: Response) => {
    const userMapping = await sequelize.models.UserMapping.findByPk(
      req.params["id"]
    );
    if (userMapping === null) {
      res.sendStatus(404);
    } else {
      console.log(userMapping);
      res.json(userMapping);
    }
  })
);

export default router;

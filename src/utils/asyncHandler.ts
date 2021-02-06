import { Request, Response, NextFunction, RequestHandler } from "express";

interface AsyncRequestHandler {
  (req: Request, res: Response, next: NextFunction): Promise<any>;
}

const asyncRequestHandler = (fn: AsyncRequestHandler) => (req, res, next) => {
  fn(req, res, next).catch(next);
};

export default asyncRequestHandler;

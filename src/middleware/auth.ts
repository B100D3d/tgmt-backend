import {NextFunction, Request, Response} from "express";

const checkToken = (req: Request, res: Response, next: NextFunction) => 1;

export default checkToken;

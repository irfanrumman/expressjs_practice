import type { NextFunction, Request, Response } from "express";
import fs from "fs";

const logger = (req: Request, res: Response, next: NextFunction) => {
  const log = `\nMethod => ${req.method}  Time => ${Date.now()}  Url => ${req.url} \n`;
  fs.appendFile(`logger.txt`, log, (error) => {
    error;
  });
  // console.log(log);
  next();
};
export default logger;

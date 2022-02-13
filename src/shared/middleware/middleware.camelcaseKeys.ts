import * as omitEmpty from 'omit-empty';
import { NextFunction, Request, Response } from 'express';

// remove 6 giá trị false trừ số 0
export const removeEmptyProperties = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    req.body = omitEmpty(req.body);
    req.params = omitEmpty(req.params);
    req.query = omitEmpty(req.query);
    req.domain = `${req.protocol}://${req.headers.host}`;
    return next();
  };
};



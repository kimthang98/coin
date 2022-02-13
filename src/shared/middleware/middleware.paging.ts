import { NextFunction, Request, Response } from 'express';
import { PAGING_DEFAULT } from '../common/constants';
export function pagingMiddleware() {
  return (req: Request, res: Response, next: NextFunction) => {
    let { page, limit }: any = req.query;
    if (!Number(page)) page = PAGING_DEFAULT.PAGE;
    if (!Number(limit)) limit = PAGING_DEFAULT.LIMIR;
    page = Number(Number(page).toFixed());
    limit = Number(Number(limit).toFixed());
    const offset = (page - 1) * limit;
    const paging = {
      offset: offset,
      page: page,
      limit: limit,
    };
    req.paging = paging;
    next();
  };
}

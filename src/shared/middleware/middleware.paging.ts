import { NextFunction, Request, Response } from 'express';
import { PAGING_DEFAULT } from '../common/constants';

export function checkISO(date: string): boolean {
  return new Date(date).toJSON() === date;
}
export function pagingMiddleware() {
  return (req: Request, res: Response, next: NextFunction) => {
    let { page, take, end_date, start_date }: any = req.query;
    if (!Number(page)) page = PAGING_DEFAULT.PAGE;
    if (!Number(take)) take = PAGING_DEFAULT.LIMIR;
    page = Number(Number(page).toFixed());
    take = Number(Number(take).toFixed());
    const skip = (page - 1) * take;
    const paging = {
      skip: skip,
      page: page,
      take: take,
    };
    req.paging = paging;
    const arr = [];

    const date = {
      end_date: end_date || new Date(Date.now() + 100000).toISOString(),
      start_date: start_date || new Date(1000).toISOString(),
    };
    if (!checkISO(date.end_date)) arr.push('end_date phải là kiểu ISO');
    if (!checkISO(date.start_date)) arr.push('start_date phải là kiểu ISO');
    if (arr.length) {
      return res.status(400).json({
        status: 0,
        statusCode: 400,
        message: arr,
        error: 'Bad Request',
      });
    }
    req.date = date;
    return next();
  };
}

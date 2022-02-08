import { ObjectLiteral } from 'typeorm';

export interface Pagination {
  total: number;
  limit: number;
  page: number;
  totalpages?: number;
}

export interface ErrorResponseModel {
  statusCode: number;
  message: string;
  error: Error;
}

export interface IPaginationOptions {
  limit: number;
  page: number;
}

export interface SuccessResponseModel {
  data: any;
  pagination?: Pagination;
}

export interface Entity extends ObjectLiteral {}

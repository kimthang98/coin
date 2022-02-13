import { ObjectLiteral } from 'typeorm';

export interface Pagination {
  total: number;
  limit: number;
  page: number;
  totalpages?: number;
}

export interface ErrorResponseModel {
  status: number;
  statusCode: number;
  message: string;
  error: Error;
}

export interface IPaginationOptions {
  limit: number;
  page: number;
}

export interface SuccessResponseModel {
  status: number;
  statusCode: number;
  data: any;
  message: string;
  pagination?: Pagination;
}

export interface IPagination extends IPaginationOptions {
  total: number;
}

export interface Entity extends ObjectLiteral {}
export interface EnvType {
  APP_NAME?: string;
  APP_ENV?: string;
  APP_KEY?: string;
  JWT_TTL?: string;
  PORT?: string;
  DB_CONNECTION?: string;
  DB_HOST?: string;
  DB_PORT?: string;
  DB_DATABASE?: string;
  DB_USERNAME?: string;
  DB_PASSWORD?: string;
  DB_LOGGING?: string;
  MAIL_MAILER?: string;
  MAIL_HOST?: string;
  MAIL_PORT?: string;
  MAIL_USERNAME?: string;
  MAIL_PASSWORD?: string;
  MAIL_ENCRYPTION?: string;
  MAIL_FROM_ADDRESS?: string;
  MAIL_FROM_NAME?: string;
  [key: string]: any;
}

export interface PagingType {
  page: number;
  limit: number;
  offset: number;
}

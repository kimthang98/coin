import { Injectable } from '@nestjs/common';
import { ObjectLiteral } from 'typeorm';
import { ErrorResponseModel, Pagination, SuccessResponseModel } from '../type/index.type';
@Injectable()
export class ApiResponseService {
  withSuccess(data: ObjectLiteral | ObjectLiteral[] | string | number): SuccessResponseModel {
    return {
      status: 1,
      statusCode: 200,
      message: 'thành công',
      data,
    };
  }
  withPagingSuccess(data: ObjectLiteral[], pagination: Pagination): SuccessResponseModel {
    return {
      status: 1,
      statusCode: 200,
      message: 'thành công',
      data,
      pagination,
    };
  }
  success(): SuccessResponseModel {
    return {
      status: 1,
      statusCode: 200,
      message: 'thành công',
      data: { success: true },
    };
  }
  withError(status: number, message: string, error?: any): ErrorResponseModel {
    return {
      status: 0,
      statusCode: status,
      message,
      error,
    };
  }
}

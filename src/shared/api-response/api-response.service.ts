import { Injectable } from '@nestjs/common';
import { ObjectLiteral } from 'typeorm';
import { ErrorResponseModel, Pagination, SuccessResponseModel } from '../type/index.type';
@Injectable()
export class ApiResponseService {
  withSuccess(data: ObjectLiteral | ObjectLiteral[]): SuccessResponseModel {
    return { data };
  }
  withPagingSuccess(data: ObjectLiteral[], pagination: Pagination): SuccessResponseModel {
    return { data, pagination };
  }
  success(): { data: { success: boolean } } {
    return { data: { success: true } };
  }
  withError(error: Error, status: number, message: string): ErrorResponseModel {
    return {
      statusCode: status,
      message: message,
      error: error,
    };
  }
}

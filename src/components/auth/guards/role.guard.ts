import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Connection, Repository } from 'typeorm';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/components/user/repositories/user.repositories';
import { ERROR_MESSAGE, _ROLE } from 'src/shared/common/constants';
import { ROLE, STATUS_USRE } from './../../../shared/common/constants';
interface tokenType {
  data: any;
  iat: number;
  exp: number;
}
@Injectable()
export class RoleGuard implements CanActivate {
  private repositoryUser: Repository<any>;
  private repositoryRole: Repository<any>;

  constructor(
    private reflector: Reflector,
    private connection: Connection,
    private jwtService: JwtService,
  ) {
    this.repositoryUser = this.connection.getCustomRepository(UserRepository);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      throw new ForbiddenException(ERROR_MESSAGE.AUTH_USER_FAIL);

      const request: Request = context.switchToHttp().getRequest();
      let token = request.headers.authorization.split('Bearer ').filter((e) => e)[0];
      const dataUser = await this.repositoryUser.findOne({
        token: token,
      });

      if (!dataUser) return false; //  throw new ForbiddenException(ERROR_MESSAGE.AUTH_USER_FAIL);
      const userId = await this.jwtService.verify(token).data;
      if (userId != dataUser.uuid) return false; // throw new ForbiddenException(ERROR_MESSAGE.AUTH_USER_FAIL);
      // check tài khoản khóa
      if (dataUser.status == STATUS_USRE.INACTIVE) return false; //  throw new ForbiddenException(ERROR_MESSAGE.AUTH_STATUS_FAIL);
      // check kích hoạt
      if (dataUser.activated == STATUS_USRE.INACTIVE) return false; //  throw new ForbiddenException(ERROR_MESSAGE.AUTH_ACTIVE_FAIL);

      const roles = this.reflector.get<string[]>('roles', context.getHandler());
      request.user = dataUser;
      if (!roles.length) return true;
      const role = Object.keys(_ROLE).map((e) => e.toLowerCase());
      const values = Object.values(_ROLE);
      const index = values.indexOf(dataUser.role);
      if (index < 0) return false; // throw new ForbiddenException(ERROR_MESSAGE.AUTH_ROLE_FAIL);
      if (role.includes(role[index])) return true;
      return false; // throw new ForbiddenException(ERROR_MESSAGE.AUTH_ROLE_FAIL);
    } catch (error) {
      return false; // throw new ForbiddenException(Object.values(error)[1]);
    }
  }
}

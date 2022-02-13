import { JwtAuthGuard } from './jwt-auth.guard';
import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ERROR_MESSAGE } from 'src/shared/common/constants';

@Injectable()
export class MyAccountGuard extends JwtAuthGuard {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    console.log(555555);

    if (err || !user) {
      throw err || new UnauthorizedException(ERROR_MESSAGE.AUTH_TOKEN_FAIL);
    }
    return user;
  }
}

import { Controller, Put, Body, NotFoundException, Req, Param, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../service/auth.service';
import { ApiResponseService } from '../../../shared/api-response/api-response.service';
import {
  ChangePasswordParams,
  FindPasswordParams,
  ForgotPasswordParams,
  LogInParams,
} from '../auth.dto';
import { SuccessResponseModel } from 'src/shared/type/index.type';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Auth } from '../decorators/auth.decorator';
import { EMAIL, ERROR_MESSAGE, conterEmil } from './../../../shared/common/constants';
import { MailService } from 'src/components/mail/service/mail.service';
@ApiTags('Auth')
@ApiHeader({
  name: 'Content-Type',
  description: 'application/json',
})
@Controller('/auth')
export class AuthController {
  constructor(
    private response: ApiResponseService,
    private authService: AuthService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}
  @ApiOperation({ summary: 'đăng nhập' })
  @Put('log-in')
  async logIn(@Body() body: LogInParams): Promise<SuccessResponseModel> {
    const checkPhone = await this.authService.findOneOrFail(
      {
        phone: body.phone,
      },
      null,
      ERROR_MESSAGE.LOGIN_PHONE_FAIL,
    );
    const checkPass = await this.authService.checkHash(body.password, checkPhone.password);
    if (!checkPass) throw new NotFoundException(ERROR_MESSAGE.LOGIN_PASSWORD_FAIL);
    const token = await this.jwtService.signAsync({ data: checkPhone.uuid });
    const tokend = await this.jwtService.verifyAsync(token);
    await this.authService.update(checkPhone.id, {
      token: token,
    });
    return this.response.withSuccess({ token: token });
  }

  @ApiOperation({ summary: 'đăng xuất' })
  @ApiBearerAuth()
  @Auth()
  @Put('log-out')
  async logout(@Req() request: Request): Promise<SuccessResponseModel> {
    await this.authService.update(request.user.id, {
      token: null,
    });
    return this.response.success();
  }

  @ApiOperation({ summary: 'đổi mật khẩu' })
  @ApiBearerAuth()
  @Auth()
  @Put('change-password')
  async changePassword(
    @Req() request: Request,
    @Body() body: ChangePasswordParams,
  ): Promise<SuccessResponseModel> {
    const [pass, check] = await Promise.all([
      this.authService.hash(body.password_new),
      this.authService.checkHash(body.password_old, request.user.password),
    ]);
    if (!check) throw new NotFoundException(ERROR_MESSAGE.LOGIN_PASSWORD_FAIL);
    await this.authService.update(request.user.id, {
      password: pass,
    });
    return this.response.success();
  }

  @ApiOperation({ summary: 'tìm mật khẩu' })
  @Put('find-password')
  async findPassword(
    @Body() body: FindPasswordParams,
    @Req() req: Request,
  ): Promise<SuccessResponseModel> {
    const check = await this.authService.findOneOrFail(
      { phone: body.phone },
      null,
      ERROR_MESSAGE.USER_FAIL,
    );
    const code = Array(20)
      .fill(2)
      .map(() =>
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.charAt(Math.random() * 62),
      )
      .join('');
    await this.authService.update(check.id, {
      token: null,
      key_password: code,
    });
    const user = {
      name: check.name,
      url: `${req.domain}/auth/form-pass/${code}`,
      account: body.phone,
      email: check.email,
    };
    await this.mailService.userresetPassword(user);
    // await sendMail(check.email, EMAIL.TITLE, conter);
    return this.response.withSuccess({ message: 'vui lòng kiểm tra email' });
  }

  @ApiOperation({ summary: 'khôi phục mật khẩu' })
  @Put('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordParams): Promise<SuccessResponseModel> {
    const [check, pass] = await Promise.all([
      this.authService.findOne({
        key_password: body.key_password,
      }),
      this.authService.hash(body.password),
    ]);
    if (!check) throw new NotFoundException(ERROR_MESSAGE.FORGOT_PASSWORD_FAIL);
    await this.authService.update(check.id, {
      password: pass,
      key_password: null,
    });
    return this.response.success();
  }

  @ApiOperation({ summary: 'mẫu' })
  @ApiParam({ name: 'key' })
  @Get('form-pass/:key')
  async formPass(@Param('key') key: string): Promise<SuccessResponseModel> {
    return this.response.withSuccess({
      data: key,
    });
  }
}

import { Body, Controller, NotAcceptableException, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserService } from '../service/user.service';
import { ApiResponseService } from '../../../shared/api-response/api-response.service';
import { v4 as uuidv4 } from 'uuid';
import { RegistrationParams, UpdateAdminParams } from '../user.dto';
import { JwtService } from '@nestjs/jwt';
import { compact } from 'lodash';
import { SuccessResponseModel } from '../../../shared/type/index.type';
import { Auth } from '../../auth/decorators/auth.decorator';
import { ROLE, ERROR_MESSAGE, STATUS_USRE } from '../../../shared/common/constants';

@ApiTags('Users')
@ApiHeader({
  name: 'Content-Type',
  description: 'application/json',
})
@Controller('/users/admin')
export class UserAdminController {
  constructor(
    private response: ApiResponseService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @ApiOperation({ summary: 'đăng ký tài khoản' })
  @ApiBearerAuth()
  @Auth(ROLE.ADMIN)
  @Post('registration')
  async registrationUser(@Body() body: RegistrationParams): Promise<SuccessResponseModel> {
    const check = await Promise.all([
      this.userService.findOne({
        phone: body.phone,
      }),
      this.userService.findOne({
        email: body.email,
      }),
    ]);
    if (compact(check).length) throw new NotAcceptableException(ERROR_MESSAGE.EMAIL_PHONE_FAIL);
    const uuid = uuidv4();
    const [token, password] = await Promise.all([
      this.jwtService.signAsync({ data: uuid }),
      this.userService.hash(body.password),
    ]);
    await this.userService.create({
      ...body,
      password: password,
      uuid: uuid,
      token: token,
    });
    return this.response.success();
  }

  @ApiOperation({ summary: 'cập nhật thông tín user' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id' })
  @Auth(ROLE.ADMIN)
  @Put('update/:id')
  async updateUser(
    @Body() body: UpdateAdminParams,
    @Param('id') id: number,
  ): Promise<SuccessResponseModel> {
    const check = await this.userService.findByIdOrFail(id, null, ERROR_MESSAGE.USER_FAIL);
    await this.userService.update(check.id, {
      ...body,
      token: body.status == STATUS_USRE.INACTIVE ? null : check.token,
    });
    return this.response.success();
  }
}

import { Body, Controller, Get, Put, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from '../service/user.service';
import { ApiResponseService } from '../../../shared/api-response/api-response.service';
import { UpdateUserParams } from '../user.dto';
import { JwtService } from '@nestjs/jwt';
import { SuccessResponseModel } from '../../../shared/type/index.type';
import { Auth } from '../../auth/decorators/auth.decorator';
import { Request } from 'express';
import { omit } from 'lodash';

@ApiTags('Users')
@ApiHeader({
  name: 'Content-Type',
  description: 'application/json',
})
@Controller('/users')
export class UserController {
  constructor(
    private response: ApiResponseService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @ApiOperation({ summary: 'cập nhật thông tín user' })
  @ApiBearerAuth()
  @Auth()
  @Put('update')
  async updateUser(
    @Req() request: Request,
    @Body() body: UpdateUserParams,
  ): Promise<SuccessResponseModel> {
    await this.userService.update(request.user.id, {
      ...body,
    });
    return this.response.success();
  }

  @ApiOperation({ summary: 'profile' })
  @ApiBearerAuth()
  @Auth()
  @Get('profile')
  async profile(@Req() request: Request): Promise<SuccessResponseModel> {
    return this.response.withSuccess(
      omit(request.user, [
        'uuid',
        'password',
        'activated',
        'key_password',
        'apiKey',
        'secret',
        'token',
        'status',
        'is_active',
        'create_by',
        'update_by',
        'delete_by',
        'updated_at',
        'deleted_at',
      ]),
    );
  }
}

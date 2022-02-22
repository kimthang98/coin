import {
  Body,
  Controller,
  Delete,
  Get,
  NotAcceptableException,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from '../service/user.service';
import { ApiResponseService } from '../../../shared/api-response/api-response.service';
import { v4 as uuidv4 } from 'uuid';
import { RegistrationParams, UpdateAdminParams } from '../user.dto';
import { JwtService } from '@nestjs/jwt';
import { compact } from 'lodash';
import { SuccessResponseModel } from '../../../shared/type/index.type';
import { Auth } from '../../auth/decorators/auth.decorator';
import { ROLE, ERROR_MESSAGE, STATUS_USRE, IS_ACTIVE } from '../../../shared/common/constants';
import { Between, getRepository, IsNull, Like, Not } from 'typeorm';
import { User } from '../entities/user.entity';
import { Request } from 'express';
import { Coin } from 'src/components/coin/entities/coin.entity';
import { History } from 'src/components/history/entities/history.entity';

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

  @ApiOperation({ summary: 'xóa user' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id' })
  @Auth(ROLE.ADMIN)
  @Delete('delete/:id')
  async deleteUser(@Param('id') id: number): Promise<SuccessResponseModel> {
    await this.userService.findByIdOrFail(id, null, ERROR_MESSAGE.USER_FAIL);
    await this.userService.update(id, {
      is_active: IS_ACTIVE.INACTIVE,
      token: null,
    });
    return this.response.success();
  }

  @ApiOperation({ summary: 'list user' })
  @ApiBearerAuth()
  @Auth(ROLE.ADMIN)
  @Get('list')
  @ApiQuery({ name: 'search', required: false, type: String, description: 'tìm kiếm user' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'page' })
  @ApiQuery({ name: 'take', required: false, type: Number, description: 'limit' })
  @ApiQuery({
    name: 'end_date',
    required: false,
    type: String,
    description: 'thơi gian kết thúc kiểu ISO',
  })
  @ApiQuery({
    name: 'start_date',
    required: false,
    type: String,
    description: 'thơi gian bắt đầu kiểu ISO',
  })
  async listUser(
    @Req() request: Request,
    @Query('search') search?: string,
  ): Promise<SuccessResponseModel> {
    let [data, count] = await getRepository(User).findAndCount({
      select: ['id', 'role', 'email', 'phone', 'url', 'name', 'activated', 'status', 'created_at'],
      where: {
        is_active: IS_ACTIVE.ACTIVE,
        id: Not(request.user.id),
        name: search ? Like(`%${search}%`) : Not(IsNull()),
        created_at: Between(new Date(request.date.start_date), new Date(request.date.end_date)),
      },

      skip: request.paging.skip,
      take: request.paging.take,
      order: { id: 'DESC' },
    });
    const paging = {
      total: count,
      take: request.paging.take,
      page: request.paging.page,
    };
    return this.response.withPagingSuccess(data, paging);
  }

  @ApiOperation({ summary: 'list user' })
  @ApiBearerAuth()
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'page' })
  @ApiQuery({ name: 'take', required: false, type: Number, description: 'limit' })
  @Auth(ROLE.ADMIN)
  @ApiParam({ name: 'id', type: Number })
  @Get('detail/:id')
  async detailUser(
    @Req() request: Request,
    @Param('id') id: number,
  ): Promise<SuccessResponseModel> {
    const [check, coins, historys] = await Promise.all([
      getRepository(User).findOne({
        select: [
          'id',
          'role',
          'email',
          'phone',
          'url',
          'name',
          'activated',
          'apiKey',
          'secret',
          'status',
          'created_at',
        ],
        where: {
          is_active: IS_ACTIVE.ACTIVE,
          id: id,
        },
      }),
      getRepository(Coin).findAndCount({
        select: [
          'id',
          'type',
          'coin',
          'time_day',
          'price_start',
          'quantily_usdt',
          'percent_sale',
          'status',
          'created_at',
        ],
        where: {
          is_active: IS_ACTIVE.ACTIVE,
          user_id: id,
        },
        skip: request.paging.skip,
        take: request.paging.take,
        order: { id: 'DESC' },
      }),
      getRepository(History).findAndCount({
        select: ['id', 'money_start', 'money_end', 'created_at'],
        where: {
          is_active: IS_ACTIVE.ACTIVE,
          user_id: id,
        },
        skip: request.paging.skip,
        take: request.paging.take,
        order: { id: 'DESC' },
      }),
    ]);
    if (!check) throw new NotFoundException(ERROR_MESSAGE.USER_FAIL);
    const obj = {
      user: check,
      coins: coins[0],
      history: historys[0],
      count_coins: coins[1],
      count_history: historys[1],
    };
    return this.response.withSuccess(obj);
  }
}

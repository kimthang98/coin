import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotAcceptableException,
  NotImplementedException,
  Param,
  PayloadTooLargeException,
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
import { CoinService } from '../service/coin.service';
import { ApiResponseService } from '../../../shared/api-response/api-response.service';
import { Auth } from './../../auth/decorators/auth.decorator';
import { Request } from 'express';
import { SuccessResponseModel } from 'src/shared/type/index.type';
import { CoinCreateParams, CoinUpdateParams } from '../coin.dto';
import { ERROR_MESSAGE, IS_ACTIVE, ROLE } from 'src/shared/common/constants';
import { Between, getRepository, Like, IsNull, Not } from 'typeorm';
import { Coin } from '../entities/coin.entity';
import { MailService } from 'src/components/mail/service/mail.service';

@ApiTags('Coin')
@ApiHeader({
  name: 'Content-Type',
  description: 'application/json',
})
@Controller('/coin')
export class CoinController {
  constructor(
    private response: ApiResponseService,
    private coinService: CoinService,
    private mailService: MailService,
  ) {}

  

  @ApiOperation({ summary: 'tạo lệnh' })
  @ApiBearerAuth()
  @Auth()
  @Post('create')
  async coinCreate(
    @Req() request: Request,
    @Body() body: CoinCreateParams,
  ): Promise<SuccessResponseModel> {
    const check = await this.coinService.findOne({
      user_id: request.user.id,
      coin: body.coin,
    });
    if (check) throw new PayloadTooLargeException(ERROR_MESSAGE.COIN_FAIL);
    const coin = await this.coinService.create({
      user_id: request.user.id,
      ...body,
    });
    return this.response.withSuccess(coin);
  }

  @ApiOperation({ summary: 'cập nhật' })
  @ApiBearerAuth()
  @Auth()
  @ApiParam({ name: 'id' })
  @Put('update/:id')
  async coinUpdate(
    @Body() body: CoinUpdateParams,
    @Param('id') id: number,
  ): Promise<SuccessResponseModel> {
    console.log(id);

    await this.coinService.findByIdOrFail(id, null, ERROR_MESSAGE.COIN_NOT_FAIL);
    await this.coinService.update(id, body);
    return this.response.success();
  }

  @ApiOperation({ summary: 'lấy list coin' })
  @ApiBearerAuth()
  @Auth()
  @ApiQuery({ name: 'search', required: false, type: String, description: 'tìm kiếm coin' })
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
  @Get('list')
  async coinList(
    @Req() request: Request,
    @Query('search') search?: string,
  ): Promise<SuccessResponseModel> {
    let [data, count] = await getRepository(Coin).findAndCount({
      select: [
        'id',
        'coin',
        'type',
        'status',
        'created_at',
        'price_start',
        'quantily_usdt',
        'percent_sale',
        'time_day',
      ],
      where: {
        is_active: 1,
        user_id: request.user.id,
        coin: search ? Like(`%${search}%`) : Not(IsNull()),
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

  @ApiOperation({ summary: 'lấy list coin' })
  @ApiBearerAuth()
  @Auth(ROLE.ADMIN)
  @ApiParam({ name: 'id', type: Number })
  @ApiQuery({ name: 'search', required: false, type: String, description: 'tìm kiếm coin' })
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
  @Get('admid/list/:id')
  async admincoinList(
    @Req() request: Request,
    @Param('id') id: number,
    @Query('search') search?: string,
  ): Promise<SuccessResponseModel> {
    let [data, count] = await getRepository(Coin).findAndCount({
      select: [
        'id',
        'coin',
        'type',
        'status',
        'created_at',
        'price_start',
        'quantily_usdt',
        'percent_sale',
        'time_day',
      ],
      where: {
        is_active: 1,
        user_id: id,
        coin: search ? Like(`%${search}%`) : Not(IsNull()),
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

  @ApiOperation({ summary: 'xóa user' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id' })
  @Auth()
  @Delete('delete/:id')
  async deleteUser(@Param('id') id: number): Promise<SuccessResponseModel> {
    await this.coinService.findByIdOrFail(id, null, ERROR_MESSAGE.COIN_FAIL);
    await this.coinService.update(id, {
      is_active: IS_ACTIVE.INACTIVE,
    });
    return this.response.success();
  }
}

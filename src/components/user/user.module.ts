import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './service/user.service';
import { User } from './entities/user.entity';
import { UserAdminController } from './controller/user.admin.controller';
import { UserController } from './controller/user.controller';
@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfigModule],
  providers: [UserService],
  controllers: [UserAdminController, UserController],
})
export class UserModule {}

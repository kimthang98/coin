
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { User } from './entities/user.entity';
@Module({
    imports: [TypeOrmModule.forFeature([User]), ConfigModule],
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule {}
    
    
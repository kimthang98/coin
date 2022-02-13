
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { HistoryController } from './controller/history.controller';
import { HistoryService } from './service/history.service';
import { History } from './entities/history.entity';
@Module({
    imports: [TypeOrmModule.forFeature([History]), ConfigModule],
    providers: [HistoryService],
    controllers: [HistoryController],
})
export class HistoryModule {}
    
    
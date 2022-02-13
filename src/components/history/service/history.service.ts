
import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { BaseService } from '../../../../src/shared/services/base.service';
import { History } from '../entities/history.entity';
import { HistoryRepository } from '../repositories/history.repositories';
    
@Injectable()
export class HistoryService extends BaseService {
    public repository: Repository<any>;
    public entity: any = History;
    constructor(private connection: Connection) {
    super();
    this.repository = this.connection.getCustomRepository(HistoryRepository);
    }
}
    
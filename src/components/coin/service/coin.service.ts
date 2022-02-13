
import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { BaseService } from '../../../../src/shared/services/base.service';
import { Coin } from '../entities/coin.entity';
import { CoinRepository } from '../repositories/coin.repositories';
    
@Injectable()
export class CoinService extends BaseService {
    public repository: Repository<any>;
    public entity: any = Coin;
    constructor(private connection: Connection) {
    super();
    this.repository = this.connection.getCustomRepository(CoinRepository);
    }
}
    
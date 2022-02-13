
import { EntityRepository, Repository } from 'typeorm';
import { History } from '../entities/history.entity';
    
@EntityRepository(History)
export class HistoryRepository extends Repository<History> {}
        
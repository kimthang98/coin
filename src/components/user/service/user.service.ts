
import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { BaseService } from '../../../../src/shared/services/base.service';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repositories';
    
@Injectable()
export class UserService extends BaseService {
    public repository: Repository<any>;
    public entity: any = User;
    constructor(private connection: Connection) {
    super();
    this.repository = this.connection.getCustomRepository(UserRepository);
    }
}
    
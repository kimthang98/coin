import { Injectable } from '@nestjs/common';
import { User } from 'src/components/user/entities/user.entity';
import { UserRepository } from 'src/components/user/repositories/user.repositories';
import { BaseService } from 'src/shared/services/base.service';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class AuthService extends BaseService {
  public repository: Repository<any>;
  public entity: any = User;
  constructor(private connection: Connection) {
    super();
    this.repository = this.connection.getCustomRepository(UserRepository);
  }
}

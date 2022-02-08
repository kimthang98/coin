import { Transformer } from '../../../../src/shared/transformers/transformers';
import { User } from '../entities/user.entity';

export class UserTransformer extends Transformer {
  transform(model: User): any {
    return model;
  }
}

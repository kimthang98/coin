
import { Transformer } from '../../../../src/shared/transformers/transformers';
import { History } from '../entities/history.entity';
    
export class HistoryTransformer extends Transformer {
  transform(model: History): any {
    return model;
    }
}
            
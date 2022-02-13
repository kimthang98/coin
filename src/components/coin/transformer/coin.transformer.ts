
import { Transformer } from '../../../../src/shared/transformers/transformers';
import { Coin } from '../entities/coin.entity';
    
export class CoinTransformer extends Transformer {
  transform(model: Coin): any {
    return model;
    }
}
            
import { User } from './components/user/entities/user.entity';
import { PagingType } from './shared/type/index.type';

declare global {
  namespace Express {
    // first, declare that we are adding a method to `Response` (the interface)
    interface Request {
      user?: User;
      uuid: string;
      domain: string;
      paging: PagingType;
      date: { end_date: string; start_date: string };
    }
  }
}

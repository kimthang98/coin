import { Controller } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { UserService } from '../service/user.service';
import { ApiResponseService } from '../../../shared/api-response/api-response.service';

@ApiTags('User')
@ApiHeader({
  name: 'Content-Type',
  description: 'application/json',
})
@Controller('/user')
export class UserController {
  constructor(private response: ApiResponseService, private userService: UserService) {}
}

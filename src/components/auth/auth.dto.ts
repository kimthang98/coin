import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class AuthParams {}
export class LogInParams {
  @ApiProperty()
  @IsNotEmpty()
  phone: string;
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
export class ChangePasswordParams {
  @IsNotEmpty()
  @ApiProperty()
  password_new: string;

  @IsNotEmpty()
  @ApiProperty()
  password_old: string;
}

export class ForgotPasswordParams {
  @ApiProperty()
  @IsNotEmpty()
  key_password: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class FindPasswordParams {
  @ApiProperty()
  @IsNotEmpty()
  phone: string;
}

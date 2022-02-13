import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
export class RegistrationParams {
  @ApiProperty({
    default: 'dokimthang98@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    default: '0345932500',
  })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    default: '0345932500',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    default: 'Đỗ Kim Thắng',
  })
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  url: string;
}

export class UpdateUserParams {
  @ApiProperty({
    default: 'dokimthang98@gmail.com',
  })
  email: string;

  @ApiProperty({
    default: 'Đỗ Kim Thắng',
  })
  name: string;
  @ApiProperty()
  url: string;
}

export class UpdateAdminParams extends UpdateUserParams {
  @ApiProperty()
  status: number;
}

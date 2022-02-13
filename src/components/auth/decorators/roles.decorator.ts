import { SetMetadata } from '@nestjs/common';

export const RoleAuth = (...roles: string[]): any => {
  return SetMetadata('roles', roles);
};

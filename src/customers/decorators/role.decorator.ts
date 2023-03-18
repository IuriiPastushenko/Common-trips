import { SetMetadata } from '@nestjs/common';
import { CustomersRole } from '@app/customers/enums/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: CustomersRole[]) =>
  SetMetadata(ROLES_KEY, roles);

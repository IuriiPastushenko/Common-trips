import { CustomerType } from '@app/customers/types/response-customer.types';

export interface CustomerResponseInterface {
  // user: UserType & { token: string };
  customer: CustomerType;
}

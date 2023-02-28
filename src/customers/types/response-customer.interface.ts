import { CustomerType } from '@app/customers/types/response-customer.types';

export interface CustomerResponseInterface {
  customer: CustomerType & { token: string };
}

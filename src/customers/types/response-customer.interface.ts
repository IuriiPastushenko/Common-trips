import { CustomerType } from '@app/customers/types/response-customer.types';

export interface CustomerResponseInterface extends CustomerType {
  token: string;
}

import { CustomerType } from '@app/customers/interfaces/response-customer.types';

export interface CustomerResponseInterface extends CustomerType {
  token: string;
}

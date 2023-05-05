import { CustomerType } from '@app/customers/types/response-customer.type';

export interface CustomerResponseInterface extends CustomerType {
  token: string;
}

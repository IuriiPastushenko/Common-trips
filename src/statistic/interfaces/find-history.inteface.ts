import { CustomerEntity } from '@app/customers/entities/customer.entity';

export interface FindHistoryInterface {
  finder: CustomerEntity;
  object: CustomerEntity;
}

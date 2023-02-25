import { CustomerEntity } from '@app/customers/entities/customer.entity';

export type CustomerType = Omit<CustomerEntity, 'hashPassword'>;

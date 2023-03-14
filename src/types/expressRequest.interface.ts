import { CustomerEntity } from '@app/customers/entities/customer.entity';
import { Request } from 'express';
export interface ExpressRequest extends Request {
  customer?: CustomerEntity;
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from '@app/customers/dto/create-customer.dto';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}

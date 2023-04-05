import { CreateCustomerDto } from '@app/customers/dto/create-customer.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}

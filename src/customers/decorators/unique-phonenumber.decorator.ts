import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Repository } from 'typeorm';
import { CustomerEntity } from '@app/customers/entities/customer.entity';

@ValidatorConstraint({
  name: 'IsPhoneNumberlUnique',
  async: true,
})
@Injectable()
export class IsPhoneNumberlUnique implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ) {}

  async validate(phoneNumber: string): Promise<boolean> {
    const customer = await this.customerRepository.findOne({
      where: { phoneNumber },
    });
    if (customer) {
      throw new BadRequestException('This phoneNumber is forbidden ');
    }

    return true;
  }
}

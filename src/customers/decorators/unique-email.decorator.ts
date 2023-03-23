import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Repository } from 'typeorm';
import { CustomerEntity } from '@app/customers/entities/customer.entity';

@ValidatorConstraint({
  name: 'IsEmailUnique',
  async: true,
})
@Injectable()
export class IsEmailUnique implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ) {}

  async validate(email: string): Promise<boolean> {
    const customer = await this.customerRepository.findOne({
      where: { email },
    });
    if (customer) {
      throw new BadRequestException('This email is forbidden ');
    }

    return true;
  }
}

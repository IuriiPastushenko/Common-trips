import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from '@app/customers/dto/create-customer.dto';
import { UpdateCustomerDto } from '@app/customers/dto/update-customer.dto';
import { CustomerEntity } from '@app/customers/entities/customer.entity';
import { CustomerResponseInterface } from './types/response-customer.interface';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ) {}
  async createCustomer(customer: CreateCustomerDto): Promise<CustomerEntity> {
    const customerByEmail = await this.customerRepository.findOne({
      where: { email: customer.email },
    });
    const customerByPhone = await this.customerRepository.findOne({
      where: { phoneNumber: customer.phoneNumber },
    });
    if (customerByEmail || customerByPhone) {
      throw new HttpException(
        'This email are token',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const newCustomer = new CustomerEntity();
    Object.assign(newCustomer, customer);
    return await this.customerRepository.save(customer);
  }

  findOne(id: number) {
    return `This action returns a #${id} Customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} Customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} Customer`;
  }

  buildCustomerResponse(customer: CustomerEntity): CustomerResponseInterface {
    return {
      customer: {
        ...customer,
        // token: this.generateJwt(user),
      },
    };
  }
}

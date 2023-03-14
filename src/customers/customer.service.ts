import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from '@app/customers/dto/create-customer.dto';
import { LoginCustomerDto } from '@app/customers/dto/login-customer.dto';
import { CustomerEntity } from '@app/customers/entities/customer.entity';
import { CustomerResponseInterface } from './types/response-customer.interface';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ) {}
  async createCustomer(
    dataForCreateCustomer: CreateCustomerDto,
  ): Promise<CustomerEntity> {
    const customerByEmail = await this.customerRepository.findOne({
      where: { email: dataForCreateCustomer.email },
    });
    if (customerByEmail) {
      throw new UnprocessableEntityException('This email are token');
    }
    const customerByPhone = await this.customerRepository.findOne({
      where: { phoneNumber: dataForCreateCustomer.phoneNumber },
    });
    if (customerByPhone) {
      throw new UnprocessableEntityException('This phone are token');
    }
    const newCustomer = new CustomerEntity();
    Object.assign(newCustomer, dataForCreateCustomer);
    return this.customerRepository.save(newCustomer);
  }

  async loginCustomer(
    dataForLoginCustomer: LoginCustomerDto,
  ): Promise<CustomerEntity> {
    const customer = await this.customerRepository.findOne({
      where: { email: dataForLoginCustomer.email },
    });
    if (!customer) {
      throw new UnprocessableEntityException('E-mail is not valid');
    }
    const isPasswordCorrect = await compare(
      dataForLoginCustomer.password,
      customer.password,
    );
    if (!isPasswordCorrect) {
      throw new UnprocessableEntityException('Password is not valid');
    }
    return customer;
  }

  findById(id: number): Promise<CustomerEntity> {
    return this.customerRepository.findOne({ where: { id } });
  }

  remove(id: number) {
    return `This action removes a #${id} Customer`;
  }

  generateJwt(customer: CustomerEntity): string {
    return sign(
      {
        id: customer.id,
        email: customer.email,
      },
      'JWT_SECRET',
    );
  }

  buildCustomerResponse(customer: CustomerEntity): CustomerResponseInterface {
    delete customer.password;
    return {
      customer: {
        ...customer,
        token: this.generateJwt(customer),
      },
    };
  }
}

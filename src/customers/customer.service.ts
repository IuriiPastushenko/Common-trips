import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from '@app/customers/dto/create-customer.dto';
import { LoginCustomerDto } from '@app/customers/dto/login-customer.dto';
import { CustomerEntity } from '@app/customers/entities/customer.entity';
import { CustomerResponseInterface } from './types/response-customer.interface';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';

@Injectable()
export class CustomersService {
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
    const customerByPhone = await this.customerRepository.findOne({
      where: { phoneNumber: dataForCreateCustomer.phoneNumber },
    });
    if (customerByEmail || customerByPhone) {
      throw new HttpException(
        'This email are token',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
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
      throw new HttpException(
        'E-mail is not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const isPasswordCorrect = await compare(
      dataForLoginCustomer.password,
      customer.password,
    );
    if (!isPasswordCorrect) {
      throw new HttpException(
        'Password is not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return customer;
  }

  findOne(id: number) {
    return `This action returns a #${id} Customer`;
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

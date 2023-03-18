import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from '@app/customers/dto/create-customer.dto';
import { LoginCustomerDto } from '@app/customers/dto/login-customer.dto';
import { CustomerEntity } from '@app/customers/entities/customer.entity';
import { CustomerResponseInterface } from './types/response-customer.interface';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerType } from './types/response-customer.types';

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
      throw new UnprocessableEntityException('This email is token');
    }
    const customerByPhone = await this.customerRepository.findOne({
      where: { phoneNumber: dataForCreateCustomer.phoneNumber },
    });
    if (customerByPhone) {
      throw new UnprocessableEntityException('This phone is token');
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

  async findById(id: number): Promise<CustomerEntity> {
    const customer = await this.customerRepository.findOne({ where: { id } });
    if (!customer) {
      throw new NotFoundException(`Incorrect id=${id}`);
    }
    return customer;
  }

  async getCustomerById(
    currentCustomer: CustomerEntity,
    id: number,
  ): Promise<CustomerEntity> {
    const adminRoleCustomer = currentCustomer.roles.includes('admin');
    if (!adminRoleCustomer && !(currentCustomer.id === id)) {
      throw new ForbiddenException(
        `Access is allowed only admin or customer with id=${id}`,
      );
    }
    const customer = await this.findById(id);
    return customer;
  }

  async updateCustomer(
    currentCustomer: CustomerEntity,
    id: number,
    dataForUpdateCustomer: UpdateCustomerDto,
  ): Promise<CustomerEntity> {
    const customer = await this.getCustomerById(currentCustomer, id);
    if ('email' in dataForUpdateCustomer) {
      const emailFromDB = await this.customerRepository.findOne({
        where: { email: dataForUpdateCustomer.email },
      });
      if (emailFromDB) {
        throw new UnprocessableEntityException('This email is token');
      }
    }
    if ('phoneNumber' in dataForUpdateCustomer) {
      const phoneNumberFromDB = await this.customerRepository.findOne({
        where: { email: dataForUpdateCustomer.email },
      });
      if (phoneNumberFromDB) {
        throw new UnprocessableEntityException('This phone number is token');
      }
    }
    if ('roles' in dataForUpdateCustomer && !customer.roles.includes('admin')) {
      throw new ForbiddenException('Access is allowed only admin');
    }
    Object.assign(customer, dataForUpdateCustomer);
    return await this.customerRepository.save(customer);
  }

  async remove(currentCustomer: CustomerEntity, id: number) {
    await this.getCustomerById(currentCustomer, id);
    return this.customerRepository.delete({ id });
  }

  generateJwt(customer: CustomerEntity): string {
    return sign(
      {
        id: customer.id,
      },
      'JWT_SECRET',
    );
  }

  buildCustomerResponse(customer: CustomerEntity): CustomerType {
    delete customer.password;
    return customer;
  }

  buildCustomerResponseWithToken(
    customer: CustomerEntity,
  ): CustomerResponseInterface {
    return {
      customer: {
        ...this.buildCustomerResponse(customer),
        token: this.generateJwt(customer),
      },
    };
  }
}

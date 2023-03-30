import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from '@app/customers/dto/create-customer.dto';
import { LoginCustomerDto } from '@app/customers/dto/login-customer.dto';
import { CustomerEntity } from '@app/customers/entities/customer.entity';
import { CustomerResponseInterface } from './interfaces/response-customer.interface';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { UpdateCustomerDto } from '@app/customers/dto/update-customer.dto';
import { CustomerType } from '@app/customers/interfaces/response-customer.types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
    private configService: ConfigService,
  ) {}
  async createCustomer(
    dataForCreateCustomer: CreateCustomerDto,
  ): Promise<CustomerEntity> {
    const customer = this.customerRepository.create(dataForCreateCustomer);
    return this.customerRepository.save(customer);
  }

  async loginCustomer(
    dataForLoginCustomer: LoginCustomerDto,
  ): Promise<CustomerEntity> {
    const customer = await this.customerRepository.findOne({
      where: { email: dataForLoginCustomer.email },
    });
    if (!customer) {
      throw new NotFoundException('E-mail is not valid');
    }
    const isPasswordCorrect = await compare(
      dataForLoginCustomer.password,
      customer.password,
    );
    if (!isPasswordCorrect) {
      throw new BadRequestException('Password is not valid');
    }
    return customer;
  }

  async findCustomerById(id: number): Promise<CustomerEntity> {
    const customer = await this.customerRepository.findOne({ where: { id } });
    if (!customer) {
      throw new NotFoundException(`Incorrect id=${id}`);
    }
    return customer;
  }

  async getCustomerByIdAndRoles(
    currentCustomer: CustomerEntity,
    id: number,
  ): Promise<CustomerEntity> {
    const adminRoleCustomer = currentCustomer.roles.includes('admin');
    if (!adminRoleCustomer && currentCustomer.id !== id) {
      throw new ForbiddenException(
        `Access is allowed only admin or customer with id=${id}`,
      );
    }
    const customer = await this.findCustomerById(id);
    return customer;
  }

  async updateCustomer(
    currentCustomer: CustomerEntity,
    id: number,
    dataForUpdateCustomer: UpdateCustomerDto,
  ): Promise<CustomerEntity> {
    const customer = await this.getCustomerByIdAndRoles(currentCustomer, id);
    if (dataForUpdateCustomer.roles && !customer.roles.includes('admin')) {
      throw new ForbiddenException('Access is allowed only admin');
    }
    Object.assign(customer, dataForUpdateCustomer);
    return this.customerRepository.save(customer);
  }

  async remove(currentCustomer: CustomerEntity, id: number) {
    await this.getCustomerByIdAndRoles(currentCustomer, id);
    return this.customerRepository.delete({ id });
  }

  buildCustomerResponse(customer: CustomerEntity): CustomerType {
    delete customer.password;
    return customer;
  }

  buildCustomerResponseWithToken(
    customer: CustomerEntity,
  ): CustomerResponseInterface {
    return {
      ...this.buildCustomerResponse(customer),
      token: this.generateJwt(customer),
    };
  }

  generateJwt(customer: CustomerEntity): string {
    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    return sign(
      {
        id: customer.id,
      },
      jwtSecret,
    );
  }
}

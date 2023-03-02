import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CustomersService } from '@app/customers/customer.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from '@app/customers/entities/customer.entity';
import { LoginCustomerDto } from '@app/customers/dto/login-customer.dto';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ) {}

  async validateUser(
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
}

import { Injectable } from '@nestjs/common';
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

  async validateCustomer(
    dataForLoginCustomer: LoginCustomerDto,
  ): Promise<CustomerEntity> | null {
    console.log(dataForLoginCustomer);
    console.log(dataForLoginCustomer.password);
    const customer = await this.customerRepository.findOne({
      where: { email: dataForLoginCustomer.email },
    });
    console.log(customer);
    console.log(customer.password);
    // const isPasswordCorrect = await compare(
    //   dataForLoginCustomer.password,
    //   customer.password,
    // );
    if (customer) {
      return customer;
    }
    return null;
  }
}

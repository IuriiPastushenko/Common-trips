import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { CustomerService } from '@app/customers/customer.service';
import { CreateCustomerDto } from '@app/customers/dto/create-customer.dto';
import { LoginCustomerDto } from '@app/customers/dto/login-customer.dto';
import { CustomerResponseInterface } from '@app/customers/types/response-customer.interface';
import { CurrentCustomer } from '@app/customers/decorators/customer.decorator';
import { CustomerEntity } from './entities/customer.entity';
import { AuthGuard } from './guards/auth.guard';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomerService) {}

  @Post('/create')
  @UsePipes(new ValidationPipe())
  async create(
    @Body('customer') dataForCreateCustomer: CreateCustomerDto,
  ): Promise<CustomerResponseInterface> {
    const customer = await this.customersService.createCustomer(
      dataForCreateCustomer,
    );
    return this.customersService.buildCustomerResponse(customer);
  }

  @Post('/login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body('customer') dataForLoginCustomer: LoginCustomerDto,
  ): Promise<CustomerResponseInterface> {
    const customer = await this.customersService.loginCustomer(
      dataForLoginCustomer,
    );
    return this.customersService.buildCustomerResponse(customer);
  }

  @Get('/currentcustomer')
  @UseGuards(AuthGuard)
  async currentCustomer(
    @CurrentCustomer() customer: CustomerEntity,
  ): Promise<CustomerResponseInterface> {
    return this.customersService.buildCustomerResponse(customer);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateCustomerDto: UpdateCustomerDto,
  // ) {
  //   return this.customersService.update(+id, updateCustomerDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(+id);
  }
}

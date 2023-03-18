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
  Patch,
} from '@nestjs/common';
import { CustomerService } from '@app/customers/customer.service';
import { CreateCustomerDto } from '@app/customers/dto/create-customer.dto';
import { LoginCustomerDto } from '@app/customers/dto/login-customer.dto';
import { CustomerResponseInterface } from '@app/customers/types/response-customer.interface';
import { CurrentCustomer } from '@app/customers/decorators/customer.decorator';
import { CustomerEntity } from '@app/customers/entities/customer.entity';
import { AuthGuard } from '@app/customers/guards/auth.guard';
import { UpdateCustomerDto } from '@app/customers/dto/update-customer.dto';
import { CustomersRole } from '@app/customers/enums/role.enum';
import { RoleGuard } from '@app/customers/guards/role.guard';
import { Roles } from './decorators/role.decorator';
import { CustomerType } from './types/response-customer.types';

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
    return this.customersService.buildCustomerResponseWithToken(customer);
  }

  @Post('/login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body('customer') dataForLoginCustomer: LoginCustomerDto,
  ): Promise<CustomerResponseInterface> {
    const customer = await this.customersService.loginCustomer(
      dataForLoginCustomer,
    );
    return this.customersService.buildCustomerResponseWithToken(customer);
  }

  @Get('/currentcustomer')
  @UseGuards(AuthGuard)
  async currentCustomer(
    @CurrentCustomer() currentCustomer: CustomerEntity,
  ): Promise<CustomerType> {
    return this.customersService.buildCustomerResponse(currentCustomer);
  }

  @Get('/customer/:id')
  @UseGuards(AuthGuard)
  async getCustomerById(
    @CurrentCustomer() currentCustomer: CustomerEntity,
    @Param('id') id: string,
  ): Promise<CustomerType> {
    const customer = await this.customersService.getCustomerById(
      currentCustomer,
      +id,
    );
    return this.customersService.buildCustomerResponse(customer);
  }

  // @Patch('/customer/:id')
  // @UseGuards(AuthGuard)
  // async update(
  //   @CurrentCustomer() currentCustomer: CustomerEntity,
  //   @Param('id') id: string,
  //   @Body() dataForUpdateCustomer: UpdateCustomerDto,
  //   @CurrentCustomer() currentCustomer: CustomerEntity,
  // ): Promise<CustomerResponseInterface> {
  //   const customer = await this.customersService.updateCustomer(
  //     id,
  //     dataForUpdateCustomer,
  //   );
  //   return this.customersService.buildCustomerResponse(customer);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(+id);
  }
}

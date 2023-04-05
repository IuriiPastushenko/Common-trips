import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { CustomerService } from '@app/customers/customer.service';
import { CreateCustomerDto } from '@app/customers/dto/create-customer.dto';
import { LoginCustomerDto } from '@app/customers/dto/login-customer.dto';
import { CustomerResponseInterface } from '@app/customers/interfaces/response-customer.interface';
import { CurrentCustomer } from '@app/customers/decorators/customer.decorator';
import { CustomerEntity } from '@app/customers/entities/customer.entity';
import { AuthGuard } from '@app/customers/guards/auth.guard';
import { UpdateCustomerDto } from '@app/customers/dto/update-customer.dto';
import { CustomerType } from '@app/customers/interfaces/response-customer.types';
import { DeleteResult } from 'typeorm';
import { CustomerStatisticService } from '@app/customers/customer-statistic.service';
import { ApiCreateCustomer } from '@app/customers/api/create.decorator';
import { ApiLoginCustomer } from '@app/customers/api/login.decorator';
import { ApiTags } from '@nestjs/swagger';
import { ApiUpdateCustomer } from '@app/customers/api/update.decorator';
import { ApiCurrentCustomer } from '@app/customers/api/current-customer.decorator';
import { ApiCustomerByID } from '@app/customers/api/customer-by-id.decorator';
import { ApiDeleteustomer } from '@app/customers/api/delete.decorator';

@Controller('customers')
@ApiTags('customers')
export class CustomersController {
  constructor(
    private readonly customersService: CustomerService,
    private readonly customersStaticService: CustomerStatisticService,
  ) {}

  @Post('/create')
  @ApiCreateCustomer()
  async create(
    @Body() dataForCreateCustomer: CreateCustomerDto,
  ): Promise<CustomerResponseInterface> {
    const customer = await this.customersService.createCustomer(
      dataForCreateCustomer,
    );
    return this.customersService.buildCustomerResponseWithToken(customer);
  }

  @Post('/login')
  @ApiLoginCustomer()
  async login(
    @Body() dataForLoginCustomer: LoginCustomerDto,
  ): Promise<CustomerResponseInterface> {
    const customer = await this.customersService.loginCustomer(
      dataForLoginCustomer,
    );
    return this.customersService.buildCustomerResponseWithToken(customer);
  }

  @Get('/currentcustomer')
  @UseGuards(AuthGuard)
  @ApiCurrentCustomer()
  async currentCustomer(
    @CurrentCustomer() currentCustomer: CustomerEntity,
  ): Promise<CustomerType> {
    return this.customersService.buildCustomerResponse(currentCustomer);
  }

  @Get('/customer/:id')
  @UseGuards(AuthGuard)
  @ApiCustomerByID()
  async getCustomerById(
    @CurrentCustomer() currentCustomer: CustomerEntity,
    @Param('id') id: string,
  ): Promise<CustomerType> {
    const customer = await this.customersService.findCustomerById(+id);
    await this.customersStaticService.createFindHistory(
      currentCustomer,
      customer,
    );
    return this.customersService.buildCustomerResponse(customer);
  }

  @Patch('/customer/:id')
  @UseGuards(AuthGuard)
  @ApiUpdateCustomer()
  async update(
    @CurrentCustomer() currentCustomer: CustomerEntity,
    @Param('id') id: string,
    @Body() dataForUpdateCustomer: UpdateCustomerDto,
  ): Promise<CustomerType> {
    const customer = await this.customersService.updateCustomer(
      currentCustomer,
      +id,
      dataForUpdateCustomer,
    );
    return this.customersService.buildCustomerResponse(customer);
  }

  @Delete('/customer/:id')
  @UseGuards(AuthGuard)
  @ApiDeleteustomer()
  remove(
    @CurrentCustomer() currentCustomer: CustomerEntity,
    @Param('id') id: string,
  ): Promise<DeleteResult> {
    return this.customersService.remove(currentCustomer, +id);
  }
}

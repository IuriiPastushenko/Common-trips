import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CustomersService } from '@app/customers/customer.service';
import { CreateCustomerDto } from '@app/customers/dto/create-customer.dto';
import { UpdateCustomerDto } from '@app/customers/dto/update-customer.dto';
import { CustomerResponseInterface } from '@app/customers/types/response-customer.interface';
import { LoginCustomerDto } from '@app/customers/dto/login-customer.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post('/create')
  async create(
    @Body('customer') dataForCreateCustomer: CreateCustomerDto,
  ): Promise<CustomerResponseInterface> {
    const customer = await this.customersService.createCustomer(
      dataForCreateCustomer,
    );
    return this.customersService.buildCustomerResponse(customer);
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Body() dataForLoginCustomer: LoginCustomerDto): Promise<any> {
  
    //   const customer = await this.localStrategy.validate(dataForLoginCustomer);
    //   return this.customersService.buildCustomerResponse(customer);
    return dataForLoginCustomer;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(+id);
  }
}

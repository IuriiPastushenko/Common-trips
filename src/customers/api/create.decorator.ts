import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateCustomerDto } from '@app/customers/dto/create-customer.dto';
import { CustomerApiResponseWithToken } from '@app/customers/api/types/customer-token.response';

export function ApiCreateCustomer() {
  return applyDecorators(
    ApiBody({
      type: CreateCustomerDto,
      examples: {
        validExample: {
          value: {
            firstName: 'firstName03',
            secondName: 'secondName03',
            yearOfBirth: 2003,
            email: 'firstName03@uuu.ua',
            password: '03',
            phoneNumber: '+38077111303',
            image: 'string4',
            сarName: 'сarName3',
            yearOfTheCar: 2003,
          },
        },
      },
    }),
    ApiOperation({ summary: 'Create new customer' }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'Success',
      type: CustomerApiResponseWithToken,
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'This email or phoneNumber is forbidden',
    }),
  );
}

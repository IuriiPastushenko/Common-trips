import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginCustomerDto } from '@app/customers/dto/login-customer.dto';
import { CustomerApiResponseWithToken } from '@app/customers/api/types/customer-token.response';

export function ApiLoginCustomer() {
  return applyDecorators(
    ApiBody({
      type: LoginCustomerDto,
      examples: {
        validExample: {
          value: {
            email: 'firstName03@uuu.ua',
            password: '03',
          },
        },
      },
    }),
    ApiOperation({ summary: 'Login customer' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Success',
      type: CustomerApiResponseWithToken,
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'E-mail or password is not valid',
    }),
  );
}

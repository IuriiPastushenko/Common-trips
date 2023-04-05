import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { CustomerApiResponse } from '@app/customers/api/types/customer.response';

export function ApiCustomerByID() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiParam({
      name: 'id',
      required: true,
      description: 'Customer history find identifier',
    }),
    ApiOperation({ summary: 'Get customer history find' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Success',
      type: CustomerApiResponse,
    }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'No authorized',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Incorrect id',
    }),
  );
}

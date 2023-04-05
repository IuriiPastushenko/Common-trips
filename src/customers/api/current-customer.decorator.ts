import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { CustomerApiResponse } from '@app/customers/api/types/customer.response';

export function ApiCurrentCustomer() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiParam({
      name: 'id',
      required: true,
      description: 'Current customer identifier',
    }),
    ApiOperation({ summary: 'Get current customer' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Success',
      type: CustomerApiResponse,
    }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'No authorized',
    }),
  );
}

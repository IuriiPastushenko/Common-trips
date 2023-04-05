import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { CustomerApiResponse } from '@app/customers/api/types/customer.response';
import { DeleteResult } from 'typeorm';

export function ApiDeleteustomer() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiParam({
      name: 'id',
      required: true,
      description: 'Customer identifier',
    }),
    ApiOperation({ summary: 'Delete customer by id' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Success',
      type: DeleteResult,
    }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'No authorized',
    }),
    ApiResponse({
      status: HttpStatus.FORBIDDEN,
      description: 'Access is allowed only admin or customer with id',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Incorrect id',
    }),
  );
}

import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { CustomerApiResponse } from '@app/customers/api/types/customer.response';
import { UpdateCustomerDto } from '@app/customers/dto/update-customer.dto';

export function ApiUpdateCustomer() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiParam({
      name: 'id',
      required: true,
      description: 'Customer identifier',
    }),
    ApiBody({
      type: UpdateCustomerDto,
      examples: {
        validExample: {
          value: {
            firstName: 'firstName55',
          },
        },
      },
    }),
    ApiOperation({ summary: 'Update customer' }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'Success',
      type: CustomerApiResponse,
    }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'No authorized',
    }),
    ApiResponse({
      status: HttpStatus.FORBIDDEN,
      description: 'Access is allowed only admin',
    }),
  );
}

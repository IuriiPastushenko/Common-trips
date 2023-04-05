import { ApiProperty } from '@nestjs/swagger';
import { CustomerApiResponse } from '@app/customers/api/types/customer.response';

export class CustomerApiResponseWithToken extends CustomerApiResponse {
  @ApiProperty({
    description: 'Roles of the customer in the app',
  })
  token: string;
}

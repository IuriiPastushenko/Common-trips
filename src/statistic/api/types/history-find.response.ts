import { ApiProperty } from '@nestjs/swagger';

export class HistoryFindApiResponse {
  @ApiProperty({ description: 'The customer find date' })
  date: Date;

  @ApiProperty({ description: 'Finder of the customer' })
  secondName: string;
}

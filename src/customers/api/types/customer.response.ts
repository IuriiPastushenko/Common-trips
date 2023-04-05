import { ApiProperty } from '@nestjs/swagger';

export class CustomerApiResponse {
  @ApiProperty({ description: 'First name of the customer' })
  firstName: string;

  @ApiProperty({ description: 'Second name of the customer' })
  secondName: string;

  @ApiProperty({ description: 'Gender of the customer' })
  gender: string;

  @ApiProperty({ description: 'Year birth of the customer' })
  yearOfBirth: number;

  @ApiProperty({ description: 'Email of the customer' })
  email: string;

  @ApiProperty({ description: 'Phone_number of the customer' })
  phoneNumber: string;

  @ApiProperty({ description: 'Photo of the customer' })
  image: string;

  @ApiProperty({ description: 'Car of the customer' })
  сarName: string;

  @ApiProperty({
    description: ' Year of production car of the customer',
  })
  yearOfTheCar: number;

  @ApiProperty({
    description: 'Roles of the customer in the app',
  })
  roles: string[];
}

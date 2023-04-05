import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginCustomerDto {
  @ApiProperty({ description: 'Email of the customer', nullable: false })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'Password of the customer', nullable: false })
  @IsString()
  readonly password: string;
}

import {
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Validate,
} from 'class-validator';
import { IsEmailUnique } from '@app/customers/decorators/unique-email.decorator';
import { CustomersRole } from '@app/customers/enums/role.enum';
import { IsPhoneNumberlUnique } from '@app/customers/decorators/unique-phonenumber.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../enums/gender.enum';

export class CreateCustomerDto {
  @ApiProperty({ description: 'First name of the customer', nullable: false })
  @IsString()
  readonly firstName: string;

  @ApiProperty({ description: 'Second name of the customer', nullable: false })
  @IsString()
  readonly secondName: string;

  @ApiProperty({ description: 'Gender of the customer', nullable: true })
  @IsOptional()
  @IsEnum(Gender)
  readonly gender?: string;

  @ApiProperty({ description: 'Year birth of the customer', nullable: true })
  @IsOptional()
  @IsInt()
  @Max(new Date().getFullYear())
  readonly yearOfBirth?: number;

  @ApiProperty({ description: 'Email of the customer', nullable: false })
  @IsEmail()
  @Validate(IsEmailUnique)
  readonly email: string;

  @ApiProperty({ description: 'Password of the customer', nullable: false })
  @IsString()
  readonly password: string;

  @ApiProperty({ description: 'Phone_number of the customer', nullable: false })
  @IsString()
  @Validate(IsPhoneNumberlUnique)
  readonly phoneNumber: string;

  @ApiProperty({ description: 'Photo of the customer', nullable: true })
  @IsOptional()
  @IsString()
  readonly image?: string;

  @ApiProperty({ description: 'Car of the customer', nullable: true })
  @IsOptional()
  @IsString()
  readonly сarName?: string;

  @ApiProperty({
    description: ' Year of production car of the customer',
    nullable: true,
  })
  @IsOptional()
  @IsInt()
  @Max(new Date().getFullYear())
  readonly yearOfTheCar?: number;

  @ApiProperty({
    description: 'Roles of the customer in the app',
    nullable: true,
  })
  @IsOptional()
  @IsEnum(CustomersRole)
  readonly roles: string[];
}

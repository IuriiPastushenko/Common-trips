import { IsEmail, IsEnum, IsInt, IsString, Max } from 'class-validator';
import { CustomersRole } from '../enums/role.enum';

enum CustomersGender {
  male,
  female,
}

export class CreateCustomerDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly secondName: string;

  @IsEnum(CustomersGender)
  readonly gender?: string;

  @IsInt()
  @Max(new Date().getFullYear())
  readonly yearOfBirth?: number;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly phoneNumber: string;

  @IsString()
  readonly image?: string;

  @IsString()
  readonly сarName?: string;

  @IsInt()
  @Max(new Date().getFullYear())
  readonly yearOfManufactureOfTheCar?: number;

  @IsEnum(CustomersRole)
  readonly role?: string;
}

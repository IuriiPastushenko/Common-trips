import {
  IsEmail,
  IsEnum,
  IsInt,
  IsPhoneNumber,
  IsString,
  Max,
} from 'class-validator';

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

  @IsPhoneNumber()
  readonly phoneNumber: string;

  @IsString()
  readonly image?: string;

  @IsString()
  readonly сarName?: string;

  @IsInt()
  @Max(new Date().getFullYear())
  readonly yearOfManufactureOfTheCar?: number;
}

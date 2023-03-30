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

enum CustomersGender {
  male,
  female,
}

export class CreateCustomerDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly secondName: string;

  @IsOptional()
  @IsEnum(CustomersGender)
  readonly gender: string;

  @IsOptional()
  @IsInt()
  @Max(new Date().getFullYear())
  readonly yearOfBirth: number;

  @IsEmail()
  @Validate(IsEmailUnique)
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsString()
  @Validate(IsPhoneNumberlUnique)
  readonly phoneNumber: string;

  @IsOptional()
  @IsString()
  readonly image: string;

  @IsOptional()
  @IsString()
  readonly сarName: string;

  @IsOptional()
  @IsInt()
  @Max(new Date().getFullYear())
  readonly yearOfTheCar: number;

  @IsOptional()
  @IsEnum(CustomersRole)
  readonly roles: string[];
}

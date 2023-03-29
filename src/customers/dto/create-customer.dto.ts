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
  readonly first_name: string;

  @IsString()
  readonly second_name: string;

  @IsOptional()
  @IsEnum(CustomersGender)
  readonly gender: string;

  @IsOptional()
  @IsInt()
  @Max(new Date().getFullYear())
  readonly year_of_birth: number;

  @IsEmail()
  @Validate(IsEmailUnique)
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsString()
  @Validate(IsPhoneNumberlUnique)
  readonly phone_number: string;

  @IsOptional()
  @IsString()
  readonly image: string;

  @IsOptional()
  @IsString()
  readonly сar_name: string;

  @IsOptional()
  @IsInt()
  @Max(new Date().getFullYear())
  readonly year_of_of_the_car: number;

  @IsOptional()
  @IsEnum(CustomersRole)
  readonly roles: string[];
}

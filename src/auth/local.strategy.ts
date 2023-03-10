import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '@app/auth/auth.service';
import { LoginCustomerDto } from '@app/customers/dto/login-customer.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  args: any;
  constructor(private authService: AuthService) {
    super(args);
  }

  async validate(dataForLoginCustomer: LoginCustomerDto): Promise<any> {
    const customer = await this.authService.validateCustomer(
      dataForLoginCustomer,
    );
    if (!customer) {
      throw new UnauthorizedException();
    }
    return customer;
  }
}

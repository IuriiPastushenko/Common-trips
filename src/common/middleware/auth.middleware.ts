import { ExpressRequest } from '@app/common/interfaces/expressRequest.interface'
import { Injectable, NestMiddleware } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { CustomerService } from '@app/customers/customer.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly customerService: CustomerService,
    private configService: ConfigService,
  ) {}
  async use(req: ExpressRequest, _: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.customer = null;
      next();
      return;
    }
    const token = req.headers.authorization.split(' ')[1];
    try {
      const jwtSecret = this.configService.get<string>('JWT_SECRET');
      const decode: any = verify(token, jwtSecret);
      const customer = await this.customerService.findCustomerById(decode.id);
      req.customer = customer;
      next();
    } catch {
      req.customer = null;
      next();
    }
  }
}

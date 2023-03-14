//import { JWT_SECRET } from '@app/config';
import { ExpressRequest } from '@app/types/expressRequest.interface';
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { CustomerService } from '@app/customers/customer.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly customerService: CustomerService) {}
  async use(req: ExpressRequest, _: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.customer = null;
      next();
      return;
    }
    const token = req.headers.authorization.split(' ')[1];
    try {
      const decode: any = verify(token, 'JWT_SECRET');
      const customer = await this.customerService.findById(decode.id);
      req.customer = customer;
      next();
    } catch {
      req.customer = null;
      next();
    }
  }
}

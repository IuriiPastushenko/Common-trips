import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentCustomer = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.customer || request.customer === null) {
      return null;
    }
    if (data) {
      return request.customer[data];
    }
    return request.customer;
  },
);

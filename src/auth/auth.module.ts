import { Module } from '@nestjs/common';
import { AuthService } from '@app/auth/auth.service';
import { CustomersModule } from '@app/customers/customer.module';

@Module({
  imports: [CustomersModule],
  providers: [AuthService],
})
export class AuthModule {}

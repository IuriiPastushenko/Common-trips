import { Module } from '@nestjs/common';
import { CustomerService } from '@app/customers/customer.service';
import { CustomersController } from '@app/customers/customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from '@app/customers/entities/customer.entity';
import { AuthGuard } from '@app/customers/guards/auth.guard';
import { IsEmailUnique } from '@app/customers/decorators/unique-email.decorator';
import { IsPhoneNumberlUnique } from './decorators/unique-phonenumber.decorator';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity]), ConfigModule],
  controllers: [CustomersController],
  providers: [CustomerService, AuthGuard, IsEmailUnique, IsPhoneNumberlUnique],
  exports: [CustomerService],
})
export class CustomersModule {}

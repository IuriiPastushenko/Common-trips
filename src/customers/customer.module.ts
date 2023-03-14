import { Module } from '@nestjs/common';
import { CustomerService } from '@app/customers/customer.service';
import { CustomersController } from '@app/customers/customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from '@app/customers/entities/customer.entity';
import { AuthGuard } from '@app/customers/guards/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity])],
  controllers: [CustomersController],
  providers: [CustomerService, AuthGuard],
  exports: [CustomerService],
})
export class CustomersModule {}

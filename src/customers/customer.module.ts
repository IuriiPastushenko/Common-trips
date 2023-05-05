import { Module } from '@nestjs/common';
import { CustomerService } from '@app/customers/customer.service';
import { CustomersController } from '@app/customers/customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from '@app/customers/entities/customer.entity';
import { AuthGuard } from '@app/customers/guards/auth.guard';
import { IsEmailUnique } from '@app/customers/decorators/unique-email.decorator';
import { IsPhoneNumberlUnique } from '@app/customers/decorators/unique-phonenumber.decorator';
import { ConfigModule } from '@nestjs/config';
import { CustomerStatisticService } from '@app/customers/customer-statistic/customer-statistic.service';
import { FindCustomerEntity } from '@app/statistic/entities/find-customer.entity';
import { UploadImagesController } from './upload-images/upload-images.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerEntity, FindCustomerEntity]),
    ConfigModule,
  ],
  controllers: [CustomersController, UploadImagesController],
  providers: [
    CustomerService,
    AuthGuard,
    IsEmailUnique,
    IsPhoneNumberlUnique,
    CustomerStatisticService,
  ],
  exports: [CustomerService],
})
export class CustomersModule {}

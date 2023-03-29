import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FindCustomerEntity } from '@app/statistic/entities/find-customer.entity';
import { StatisticController } from '@app/statistic/statistic.controller';
import { StatisticService } from '@app/statistic/statistic.service';
import { AuthGuard } from '@app/customers/guards/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([FindCustomerEntity])],
  controllers: [StatisticController],
  providers: [StatisticService, AuthGuard],
  exports: [TypeOrmModule.forFeature([FindCustomerEntity])],
})
export class StatisticModule {}

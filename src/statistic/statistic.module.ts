import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FindCustomerEntity } from '@app/statistic/entities/find-customer.entity';
import { StatisticController } from '@app/statistic/statistic.controller';
import { StatisticService } from '@app/statistic/statistic.service';
import { AuthGuard } from '@app/customers/guards/auth.guard';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FindCityDateHistory,
  FindCityDateHistorySchema,
} from './schemas/find-city-date.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([FindCustomerEntity]),
    MongooseModule.forFeature([
      { name: FindCityDateHistory.name, schema: FindCityDateHistorySchema },
    ]),
  ],
  controllers: [StatisticController],
  providers: [StatisticService, AuthGuard],
  exports: [TypeOrmModule.forFeature([FindCustomerEntity])],
})
export class StatisticModule {}

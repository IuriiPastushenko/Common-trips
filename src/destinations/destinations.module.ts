import { Module } from '@nestjs/common';
import { DestinationsController } from './destinations.controller';
import { DestinationsService } from './destinations.service';
import { Destination, DestinationSchema } from './schemas/destination.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from '@app/customers/entities/customer.entity';
import {
  FindCityHistory,
  FindCityHistorySchema,
} from './schemas/find-city.schema';
import { ApiService } from '@app/api/api.service';
import { HttpModule } from '@nestjs/axios';
import { ApiModule } from '@app/api/api.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Destination.name, schema: DestinationSchema },
      { name: FindCityHistory.name, schema: FindCityHistorySchema },
    ]),
    TypeOrmModule.forFeature([CustomerEntity]),
    ApiModule,
  ],
  controllers: [DestinationsController],
  providers: [DestinationsService],
})
export class DestinationsModule {}

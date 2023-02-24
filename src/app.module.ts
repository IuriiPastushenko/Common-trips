import { Module } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { DriversModule } from '@app/drivers/drivers.module';
import configTypeOrm from '@app/ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripsModule } from '@app/trips/trips.module';
import { PassengersModule } from './passengers/passengers.module';

@Module({
  imports: [TypeOrmModule.forRoot(configTypeOrm), DriversModule, TripsModule, PassengersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

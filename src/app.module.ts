import { Module } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { CustomersModule } from '@app/customers/customer.module';
import configTypeOrm from '@app/ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripsModule } from '@app/trips/trips.module';

@Module({
  imports: [TypeOrmModule.forRoot(configTypeOrm), CustomersModule, TripsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

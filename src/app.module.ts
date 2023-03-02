import { Module } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { CustomersModule } from '@app/customers/customer.module';
import configTypeOrm from '@app/ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripsModule } from '@app/trips/trips.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configTypeOrm),
    CustomersModule,
    TripsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

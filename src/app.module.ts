import {
  MiddlewareConsumer,
  Module,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { CustomersModule } from '@app/customers/customer.module';
import configTypeOrm from '@app/ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripsModule } from '@app/trips/trips.module';
import { AuthMiddleware } from '@app/common/middleware/auth.middleware';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { RoleGuard } from '@app/customers/guards/role.guard';
import { ConfigModule } from '@nestjs/config';
import { StatisticModule } from '@app/statistic/statistic.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DestinationsModule } from './destinations/destinations.module';
import { ApiModule } from './api/api.module';
import mongoPath from './mongoose.connects';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(configTypeOrm),
    CustomersModule,
    TripsModule,
    StatisticModule,
    MongooseModule.forRoot(mongoPath),
    DestinationsModule,
    ApiModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: 'customers/*',
      method: RequestMethod.ALL,
    });
    consumer.apply(AuthMiddleware).forRoutes({
      path: 'statistic/*',
      method: RequestMethod.ALL,
    });
    consumer.apply(AuthMiddleware).forRoutes({
      path: 'destinations/*',
      method: RequestMethod.ALL,
    });
  }
}

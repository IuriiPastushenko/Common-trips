import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { CustomersModule } from '@app/customers/customer.module';
import configTypeOrm from '@app/ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripsModule } from '@app/trips/trips.module';
import { AuthMiddleware } from '@app/middleware/auth.middleware';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from '@app/customers/guards/role.guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(configTypeOrm),
    CustomersModule,
    TripsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: 'customers/*',
      method: RequestMethod.ALL,
    });
  }
}

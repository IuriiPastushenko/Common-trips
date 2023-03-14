import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { CustomersModule } from '@app/customers/customer.module';
import configTypeOrm from '@app/ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripsModule } from '@app/trips/trips.module';
import { AuthMiddleware } from '@app/middleware/auth.middleware';

@Module({
  imports: [TypeOrmModule.forRoot(configTypeOrm), CustomersModule, TripsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: 'customers/*',
      method: RequestMethod.ALL,
    });
  }
}

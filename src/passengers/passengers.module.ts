import { Module } from '@nestjs/common';
import { PassengersService } from './passengers.service';
import { PassengersController } from './passengers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassengerEntity } from './entities/passenger.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PassengerEntity])],
  controllers: [PassengersController],
  providers: [PassengersService],
})
export class PassengersModule {}

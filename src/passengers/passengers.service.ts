import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';
import { PassengerEntity } from './entities/passenger.entity';

@Injectable()
export class PassengersService {
  constructor(
    @InjectRepository(PassengerEntity)
    private readonly tripRepository: Repository<PassengerEntity>,
  ) {}
  create(createPassengerDto: CreatePassengerDto) {
    return 'This action adds a new passenger';
  }

  findAll() {
    return `This action returns all passengers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} passenger`;
  }

  update(id: number, updatePassengerDto: UpdatePassengerDto) {
    return `This action updates a #${id} passenger`;
  }

  remove(id: number) {
    return `This action removes a #${id} passenger`;
  }
}

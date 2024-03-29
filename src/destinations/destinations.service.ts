import { Injectable, NotFoundException } from '@nestjs/common';
import { Destination } from './schemas/destination.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomerEntity } from '@app/customers/entities/customer.entity';

@Injectable()
export class DestinationsService {
  constructor(
    @InjectModel(Destination.name) private destinationModel: Model<Destination>,
  ) {}

  async findByNameOfCity(city: string): Promise<Destination[]> {
    const rezult = await this.destinationModel.find({ city }).exec();
    if (rezult.length === 0) {
      throw new NotFoundException(`Incorrect city =${city}`);
    }
    return rezult;
  }

  async findById(id: string): Promise<Destination> {
    const city = await this.destinationModel.findOne({ _id: id }).exec();
    if (!city) {
      throw new NotFoundException(`Incorrect id = ${id}`);
    }
    return city;
  }

  getFinder(currentCustomer: CustomerEntity): number {
    if (currentCustomer === null) {
      return 0;
    }
    return currentCustomer.id;
  }
}

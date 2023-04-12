import { Injectable } from '@nestjs/common';
import { Destination } from './schemas/destination.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DestinationsService {
  constructor(
    @InjectModel(Destination.name) private destinationModel: Model<Destination>,
  ) {}
  async findOne(city: string): Promise<Destination[]> {
    return this.destinationModel.find().exec();
  }
}

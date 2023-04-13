import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Destination } from './schemas/destination.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class DestinationsService {
  constructor(
    @InjectModel(Destination.name) private destinationModel: Model<Destination>,
  ) {}

  async findByNameOfCity(city: string): Promise<Destination[]> {
    const rezult = await this.destinationModel.find({ city }).exec();
    if (rezult.length === 0) {
      throw new NotFoundException(`Incorrect city =${city}`)
    }
    return rezult;
  }

  async findById(id: string): Promise<Destination> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID is not valid');
    }
    const city = await this.destinationModel.findOne({ _id: id }).exec();
    if (!city) {
      throw new NotFoundException(`Incorrect id = ${id}`);
    }
    return city;
  }
}

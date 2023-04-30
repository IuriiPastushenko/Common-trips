import { Injectable } from '@nestjs/common';
import { FindCityHistory } from './schemas/find-city.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DestinationStatisticService {
  constructor(
    @InjectModel(FindCityHistory.name)
    private findCityHistoryModel: Model<FindCityHistory>,
  ) {}

  async createFindCityHistory(dataForSaveHistory: FindCityHistory) {
    const findCityHistory = new this.findCityHistoryModel(dataForSaveHistory);
    return findCityHistory.save();
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { FindCustomerEntity } from '@app/statistic/entities/find-customer.entity';
import { ResponseFindHistoryInterface } from '@app/statistic/interfaces/response-findhistory.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FindCityDateHistory } from './schemas/find-city-date.schema';
import { ResponseFindHistoryCityInterface } from './interfaces/response-findhistorycity.interface';

@Injectable()
export class StatisticService {
  constructor(
    private dataSourse: DataSource,
    @InjectModel(FindCityDateHistory.name)
    private findCityDateHistoryModel: Model<FindCityDateHistory>,
  ) {}

  async getHistorybyID(id: number): Promise<ResponseFindHistoryInterface[]> {
    const history = await this.dataSourse
      .getRepository(FindCustomerEntity)
      .createQueryBuilder('findcustomers')
      .select(['findcustomers.dateOfFind as date', 'finder.id as finder'])
      .where('findcustomers.object = :id', { id })
      .leftJoin('findcustomers.finder', 'finder')
      .getRawMany();

    if (history.length === 0) {
      throw new NotFoundException(`No search data for this id=${id}`);
    }
    return history;
  }

  async getHistoryCityById(
    id: string,
  ): Promise<ResponseFindHistoryCityInterface[]> {
    const historyCityById = await this.findCityDateHistoryModel
      .find({ city_id: id }, { _id: 0, point: 1, finder: 1, createdAt: 1 })
      .exec();
    if (historyCityById.length === 0) {
      throw new NotFoundException(`Incorrect id = ${id}`);
    }

    return historyCityById;
  }
}

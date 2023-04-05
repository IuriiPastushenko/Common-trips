import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { FindCustomerEntity } from '@app/statistic/entities/find-customer.entity';
import { ResponseFindHistoryInterface } from '@app/statistic/interfaces/response-findhistory.interface';

@Injectable()
export class StatisticService {
  constructor(private dataSourse: DataSource) {}

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
}

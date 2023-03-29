import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindCustomerEntity } from '@app/statistic/entities/find-customer.entity';

@Injectable()
export class StatisticService {
  constructor(
    @InjectRepository(FindCustomerEntity)
    private readonly customerStatisticRepository: Repository<FindCustomerEntity>,
  ) {}

  async getHistorybyID(id: number): Promise<FindCustomerEntity[]> {
    const history = await this.customerStatisticRepository.find({
      where: { object_id: id },
    });
    if (!history) {
      throw new NotFoundException(`Incorrect id=${id}`);
    }
    return history;
  }
}

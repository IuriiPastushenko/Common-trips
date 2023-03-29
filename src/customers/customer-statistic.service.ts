import { FindCustomerEntity } from '@app/statistic/entities/find-customer.entity';
import { FindHistoryInterface } from '@app/statistic/interfaces/find-history.inteface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from '@app/customers/entities/customer.entity';

@Injectable()
export class CustomerStatisticService {
  constructor(
    @InjectRepository(FindCustomerEntity)
    private readonly customerStatisticRepository: Repository<FindCustomerEntity>,
  ) {}

  async createFindHistory(
    currentCustomer: CustomerEntity,
    customer: CustomerEntity,
  ): Promise<void> {
    const dataFindHistory: FindHistoryInterface = {
      finder_id: currentCustomer.id,
      object_id: customer.id,
    };
    const findHistory =
      this.customerStatisticRepository.create(dataFindHistory);
    await this.customerStatisticRepository.save(findHistory);
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { CustomerStatisticService } from './customer-statistic.service';

describe('CustomerStatisticService', () => {
  let service: CustomerStatisticService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerStatisticService],
    }).compile();

    service = module.get<CustomerStatisticService>(CustomerStatisticService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

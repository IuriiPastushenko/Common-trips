import { FindCustomerEntity } from '../statistic/entities/find-customer.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CustomerService } from './customer.service';
import { CustomerEntity } from './entities/customer.entity';
import { ConfigService } from '@nestjs/config';

describe('CustomerService', () => {
  let service: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        { provide: DataSource, useValue: {} },
        { provide: getRepositoryToken(CustomerEntity), useValue: {} },
        { provide: getRepositoryToken(FindCustomerEntity), useValue: {} },
        ConfigService,
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

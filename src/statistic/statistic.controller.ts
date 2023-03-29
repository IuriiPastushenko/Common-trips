import { Body, Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CustomersRole } from '@app/customers/enums/role.enum';
import { RoleGuard } from '@app/customers/guards/role.guard';
import { Roles } from '@app/customers/decorators/role.decorator';
import { CurrentCustomer } from '@app/customers/decorators/customer.decorator';
import { CustomerEntity } from '@app/customers/entities/customer.entity';
import { AuthGuard } from '@app/customers/guards/auth.guard';
import { StatisticService } from '@app/statistic/statistic.service';
import { FindCustomerEntity } from '@app/statistic/entities/find-customer.entity';

@Controller('statistic')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}
  @Get('/findcustomer/:id')
  @Roles(CustomersRole.admin)
  @UseGuards(AuthGuard, RoleGuard)
  async findHistory(
    @CurrentCustomer() currentCustomer: CustomerEntity,
    @Param('id') id: string,
  ): Promise<FindCustomerEntity[]> {
    const history = await this.statisticService.getHistorybyID(+id);
    return history;
  }
}

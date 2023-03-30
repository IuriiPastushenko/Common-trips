import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CustomersRole } from '@app/customers/enums/role.enum';
import { RoleGuard } from '@app/customers/guards/role.guard';
import { Roles } from '@app/customers/decorators/role.decorator';
import { StatisticService } from '@app/statistic/statistic.service';
import { ResponseFindHistoryInterface } from '@app/statistic/interfaces/response-findhistory.interface';

@Controller('statistic')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}
  @Get('/findcustomer/:id')
  @Roles(CustomersRole.admin)
  @UseGuards(RoleGuard)
  async historyFind(
    @Param('id') id: string,
  ): Promise<ResponseFindHistoryInterface[]> {
    const history = await this.statisticService.getHistorybyID(+id);
    return history;
  }
}

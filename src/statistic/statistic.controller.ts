import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CustomersRole } from '@app/customers/enums/role.enum';
import { RoleGuard } from '@app/customers/guards/role.guard';
import { Roles } from '@app/customers/decorators/role.decorator';
import { StatisticService } from '@app/statistic/statistic.service';
import { ResponseFindHistoryInterface } from '@app/statistic/interfaces/response-findhistory.interface';
import { ApiTags } from '@nestjs/swagger';
import { ApiHistoryFind } from '@app/statistic/api/history-find.decorator';

@Controller('statistic')
@ApiTags('statistic')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}
  @Get('/findcustomer/:id')
  @Roles(CustomersRole.admin)
  @UseGuards(RoleGuard)
  @ApiHistoryFind()
  async historyFind(
    @Param('id') id: string,
  ): Promise<ResponseFindHistoryInterface[]> {
    const history = await this.statisticService.getHistorybyID(+id);
    return history;
  }
}

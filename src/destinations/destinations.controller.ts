import { Controller, Get, Param, Query } from '@nestjs/common';
import { Destination } from './schemas/destination.schema';
import { DestinationsService } from './destinations.service';
import { CurrentCustomer } from '@app/customers/decorators/customer.decorator';
import { CustomerEntity } from '@app/customers/entities/customer.entity';
import { PointOfTripDto } from './dto/point-trip.dto';
import { IdValidDto } from './dto/id-valid.dto';
import { ApiService } from '@app/connect-api/api.service';
import { FindCityHistory } from './schemas/find-city.schema';
import { DestinationStatisticService } from './destinations-statistic.service';

@Controller('destinations')
export class DestinationsController {
  constructor(
    private readonly destinationsService: DestinationsService,
    private readonly destinationStatisticService: DestinationStatisticService,
    private readonly apiService: ApiService,
  ) {}

  @Get('/city/:city')
  async findByCity(@Param('city') city: string): Promise<Destination[]> {
    return this.destinationsService.findByNameOfCity(city.toUpperCase());
  }

  @Get('cityid/:id')
  async findByID(
    @CurrentCustomer() currentCustomer: CustomerEntity,
    @Param() { id }: IdValidDto,
    @Query() { point }: PointOfTripDto,
  ): Promise<Destination> {
    const rezult = await this.destinationsService.findById(id);
    const finder = this.destinationsService.getFinder(currentCustomer);
    const weather = await this.apiService.getWeather(
      rezult.loc.x,
      rezult.loc.y,
    );
    const dataForSaveHistory: FindCityHistory = {
      city_id: id,
      city_name: rezult.city,
      point: point,
      finder,
      descriptionWeather: weather.weather[0].main,
      temp: weather.main.temp,
    };
    await this.destinationStatisticService.createFindCityHistory(
      dataForSaveHistory,
    );
    return rezult;
  }
}

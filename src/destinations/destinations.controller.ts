import { Controller, Get, Param, Query } from '@nestjs/common';
import { Destination } from './schemas/destination.schema';
import { DestinationsService } from './destinations.service';
import { CurrentCustomer } from '@app/customers/decorators/customer.decorator';
import { CustomerEntity } from '@app/customers/entities/customer.entity';
import { PointOfTripDto } from './dto/point-trip.dto';
import { IdValidDto } from './dto/id-valid.dto';

@Controller('destinations')
export class DestinationsController {
  constructor(private readonly destinationsService: DestinationsService) {}

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
    await this.destinationsService.createFindCityHistory(
      id,
      rezult.city,
      point,
      finder,
    );
    return rezult;
  }
}

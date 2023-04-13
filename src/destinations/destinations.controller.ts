import { Controller, Get, Param } from '@nestjs/common';
import { Destination } from './schemas/destination.schema';
import { DestinationsService } from './destinations.service';

@Controller('destinations')
export class DestinationsController {
  constructor(private readonly destinationsService: DestinationsService) {}

  @Get('/city/:city')
  async findByCity(@Param('city') city: string): Promise<Destination[]> {
    return this.destinationsService.findByNameOfCity(city.toUpperCase());
  }

  @Get('cityid/:id')
  async findByID(@Param('id') id: string): Promise<Destination> {
    return this.destinationsService.findById(id);
  }
}

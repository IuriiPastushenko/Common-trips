import { Controller, Get, Param } from '@nestjs/common';
import { Destination } from './schemas/destination.schema';
import { DestinationsService } from './destinations.service';

@Controller('destinations')
export class DestinationsController {
  constructor(private readonly destinationsService: DestinationsService) {}

  @Get(':city')
  async findOne(@Param('city') city: string): Promise<Destination[]> {
    return this.destinationsService.findOne(city);
  }
}

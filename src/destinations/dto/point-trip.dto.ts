import { IsEnum } from 'class-validator';
import { PointsOfTrip } from '../enams/point-trip.enum';

export class PointOfTripDto {
  @IsEnum(PointsOfTrip)
  readonly point: PointsOfTrip;
}

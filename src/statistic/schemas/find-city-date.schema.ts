import { FindCityHistory } from '@app/destinations/schemas/find-city.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type findCityDateHistorynDocument =
  HydratedDocument<FindCityDateHistory>;

@Schema({ collection: 'findcityhistories' })
export class FindCityDateHistory extends FindCityHistory {
  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const FindCityDateHistorySchema =
  SchemaFactory.createForClass(FindCityDateHistory);

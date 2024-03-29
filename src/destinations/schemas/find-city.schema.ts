import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type findCityHistorynDocument = HydratedDocument<FindCityHistory>;

@Schema()
export class FindCityHistory {
  @Prop()
  city_id: string;

  @Prop()
  city_name: string;

  @Prop()
  point: string;

  @Prop()
  finder: number;

  @Prop()
  descriptionWeather: string;

  @Prop()
  temp: number;
}

export const FindCityHistorySchema =
  SchemaFactory.createForClass(FindCityHistory);

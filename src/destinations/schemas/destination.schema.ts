import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Coordinats } from './coordinats.schema';

export type destinationDocument = HydratedDocument<Destination>;

@Schema({ collection: 'zips' })
export class Destination {
  @Prop()
  city: string;

  @Prop()
  zip: string;

  @Prop()
  loc: Coordinats;

  @Prop()
  pop: number;

  @Prop()
  state: string;
}

export const DestinationSchema = SchemaFactory.createForClass(Destination);

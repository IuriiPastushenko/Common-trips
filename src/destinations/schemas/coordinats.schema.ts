import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type coordinatsDocument = HydratedDocument<Coordinats>;

@Schema()
export class Coordinats {
  @Prop()
  x: number;

  @Prop()
  y: number;
}

export const CoordinatsSchema = SchemaFactory.createForClass(Coordinats);

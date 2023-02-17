import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Vehicle extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  numPlaca: string;

  @Prop()
  entryDate: string;

  @Prop({
    index: true,
  })
  type: string;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);

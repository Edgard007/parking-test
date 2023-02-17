import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Parking extends Document {
  @Prop({
    unique: false,
    index: true,
  })
  numPlaca: string;

  @Prop()
  startDate: string;

  @Prop()
  endDate: string;
}

export const ParkingSchema = SchemaFactory.createForClass(Parking);

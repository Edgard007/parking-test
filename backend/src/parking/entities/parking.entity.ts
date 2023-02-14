import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class Parking extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  numPlaca: number;
}
export const ParkingSchema = SchemaFactory.createForClass(Parking);

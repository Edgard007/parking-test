import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Parking extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  numPlaca: string;
}

export const ParkingSchema = SchemaFactory.createForClass(Parking);

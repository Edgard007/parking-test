import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class TypeVehicle extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  name: string;

  @Prop()
  amount: number;
}

export const TypeVehicleSchema = SchemaFactory.createForClass(TypeVehicle);

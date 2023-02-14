import { Module } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { ParkingController } from './parking.controller';
import { MongooseModule } from '@nestjs/mongoose';

// ==> Entity
import { Parking, ParkingSchema } from './entities/parking.entity';

@Module({
  controllers: [ParkingController],
  providers: [ParkingService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Parking.name,
        schema: ParkingSchema,
      },
    ]),
  ],
})
export class ParkingModule {}

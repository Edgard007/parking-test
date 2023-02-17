import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// ==> Entity's
import { Parking, ParkingSchema } from './entities/parking.entity';

// ==> Servicies
import { ParkingService } from './parking.service';
import { CommonService } from 'src/common/common.service';

// ==> controllers
import { ParkingController } from './parking.controller';

@Module({
  controllers: [ParkingController],
  providers: [ParkingService, CommonService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Parking.name,
        schema: ParkingSchema,
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class ParkingModule {}

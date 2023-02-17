import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// ==> Modules
import { VehiclesModule } from 'src/vehicles/vehicles.module';
import { TypeVehicleModule } from 'src/type-vehicle/type-vehicle.module';

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
    VehiclesModule,
    TypeVehicleModule,
  ],
  exports: [MongooseModule],
})
export class ParkingModule {}

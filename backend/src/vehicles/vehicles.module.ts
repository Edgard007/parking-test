import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// ==> Modules
import { TypeVehicleModule } from 'src/type-vehicle/type-vehicle.module';

// ==> Service
import { VehicleService } from './vehicles.service';
import { CommonService } from 'src/common/common.service';

// ==> Controller
import { VehicleController } from './vehicles.controller';

// ==> Entity
import { Vehicle, VehicleSchema } from './entities/vehicle.entity';

@Module({
  controllers: [VehicleController],
  providers: [VehicleService, CommonService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Vehicle.name,
        schema: VehicleSchema,
      },
    ]),
    TypeVehicleModule,
  ],
  exports: [MongooseModule, VehicleService],
})
export class VehiclesModule {}

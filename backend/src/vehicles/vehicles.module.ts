import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

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
  ],
  exports: [MongooseModule],
})
export class VehiclesModule {}

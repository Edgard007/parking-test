import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// ==> Controllers
import { TypeVehicleController } from './type-vehicle.controller';

// ==> Services
import { TypeVehicleService } from './type-vehicle.service';
import { CommonService } from 'src/common/common.service';

// ==> Entity
import { TypeVehicle, TypeVehicleSchema } from './entities/type-vehicle.entity';

@Module({
  controllers: [TypeVehicleController],
  providers: [TypeVehicleService, CommonService],
  imports: [
    MongooseModule.forFeature([
      {
        name: TypeVehicle.name,
        schema: TypeVehicleSchema,
      },
    ]),
  ],
  exports: [MongooseModule, TypeVehicleService],
})
export class TypeVehicleModule {}

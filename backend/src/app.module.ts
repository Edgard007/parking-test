import { Module } from '@nestjs/common';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

// ==> Modules
import { ParkingModule } from './parking/parking.module';

// ==> Config
import { JoiValidSchema } from './config/joi.validation';
import { VehiclesModule } from './vehicles/vehicles.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: JoiValidSchema,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot(process.env.MONGODB),
    ParkingModule,
    VehiclesModule,
    CommonModule,
  ],
})
export class AppModule {}

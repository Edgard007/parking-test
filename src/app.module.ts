import { Module } from '@nestjs/common';
import { ParkingModule } from './parking/parking.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ParkingModule,
  ],
})
export class AppModule {}

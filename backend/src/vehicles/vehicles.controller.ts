import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

// ==> Services
import { VehicleService } from './vehicles.service';

// ==> DTO's
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

// ==> Pipes
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';

@Controller('Vehicle')
export class VehicleController {
  constructor(private readonly VehicleService: VehicleService) {}

  @Get()
  findAll() {
    return this.VehicleService.findAll();
  }

  @Get(':param')
  findOne(@Param('param') param: string) {
    return this.VehicleService.findOne(param);
  }

  @Post()
  create(@Body() dto: CreateVehicleDto) {
    return this.VehicleService.create(dto);
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() dto: UpdateVehicleDto) {
    return this.VehicleService.update(term, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.VehicleService.remove(id);
  }
}

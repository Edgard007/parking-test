import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';

// ==> Services
import { TypeVehicleService } from './type-vehicle.service';

// ==> DTO's
import { CreateTypeVehicleDto } from './dto/create-type-vehicle.dto';
import { UpdateTypeVehicleDto } from './dto/update-type-vehicle.dto';

// ==> Pipes
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';

@Controller('type-vehicle')
export class TypeVehicleController {
  constructor(private readonly typeVehicleService: TypeVehicleService) {}

  @Get()
  findAll() {
    return this.typeVehicleService.findAll();
  }

  @Get(':param')
  findOne(@Param('param', ParseMongoIdPipe) param: string) {
    return this.typeVehicleService.findOne(param);
  }

  @Post()
  create(@Body() dto: CreateTypeVehicleDto) {
    return this.typeVehicleService.create(dto);
  }

  @Patch(':term')
  update(
    @Param('term', ParseMongoIdPipe) term: string,
    @Body() dto: UpdateTypeVehicleDto,
  ) {
    return this.typeVehicleService.update(term, dto);
  }
}

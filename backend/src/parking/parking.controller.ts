import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  // HttpCode,
  // HttpStatus,
} from '@nestjs/common';

// ==> Services
import { ParkingService } from './parking.service';

// ==> DTO's
import { CreateParkingDto } from './dto/create-parking.dto';
import { UpdateParkingDto } from './dto/update-parking.dto';

// ==> Pipes

@Controller('parking')
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @Post()
  // @HttpCode(HttpStatus.OK)
  create(@Body() createParkingDto: CreateParkingDto) {
    return this.parkingService.create(createParkingDto);
  }

  @Get()
  findAll() {
    return this.parkingService.findAll();
  }

  @Get(':param')
  findOne(@Param('param') param: string) {
    return this.parkingService.findOne(param);
  }

  @Patch(':term')
  update(
    @Param('term') term: string,
    @Body() updateParkingDto: UpdateParkingDto,
  ) {
    return this.parkingService.update(term, updateParkingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parkingService.remove(id);
  }
}

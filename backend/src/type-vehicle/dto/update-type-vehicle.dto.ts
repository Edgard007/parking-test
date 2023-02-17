import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeVehicleDto } from './create-type-vehicle.dto';

export class UpdateTypeVehicleDto extends PartialType(CreateTypeVehicleDto) {}

import { IsString, MinLength } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  @MinLength(1)
  numPlaca: string;

  @IsString()
  @MinLength(1)
  entryDate: string;

  @IsString()
  @MinLength(1)
  type: string;
}

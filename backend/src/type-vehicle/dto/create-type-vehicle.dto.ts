import {
  IsNotEmpty,
  IsPositive,
  IsString,
  Min,
  MinLength,
  IsNumber,
} from 'class-validator';

export class CreateTypeVehicleDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  amount: number;
}

import {
  IsString,
  MinLength,
  IsOptional,
  IsNumber,
  IsNotEmpty,
  Min,
} from 'class-validator';

export class CreateParkingDto {
  @IsString()
  @MinLength(1)
  numPlaca: string;

  @IsString()
  @MinLength(1)
  startDate: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  endDate?: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  amount?: number;
}

import { IsString, MinLength, IsOptional } from 'class-validator';

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
}

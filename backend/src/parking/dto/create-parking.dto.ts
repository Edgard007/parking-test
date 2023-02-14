import { IsString, MinLength } from 'class-validator';

export class CreateParkingDto {
  @IsString()
  @MinLength(1)
  numPlaca: string;
}

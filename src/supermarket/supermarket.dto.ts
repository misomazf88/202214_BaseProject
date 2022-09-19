import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { CityDto } from 'src/city/city.dto';

export class SupermarketDto {

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly longitude: number;

  @IsNotEmpty()
  @IsNumber()
  readonly latitude: number;

  @IsNotEmpty()
  @IsString()
  readonly webPage: string;

  @IsNotEmpty()
  city: CityDto[];
}
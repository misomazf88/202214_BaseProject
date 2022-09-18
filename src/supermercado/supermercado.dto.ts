import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class SupermercadoDto {

  @IsNotEmpty()
  @IsString()
  readonly nombre: string;

  @IsNotEmpty()
  @IsNumber()
  readonly longitud: number;

  @IsNotEmpty()
  @IsNumber()
  readonly latitud: number;

  @IsNotEmpty()
  @IsString()
  readonly paginaWeb: string;
}
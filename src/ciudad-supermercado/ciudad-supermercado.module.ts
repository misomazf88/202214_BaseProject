import { CiudadEntity } from 'src/ciudad/ciudad.entity';
import { CiudadSupermercadoService } from './ciudad-supermercado.service';
import { Module } from '@nestjs/common';
import { SupermercadoEntity } from 'src/supermercado/supermercado.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CiudadEntity, SupermercadoEntity])],
  providers: [CiudadSupermercadoService]
})
export class CiudadSupermercadoModule { }
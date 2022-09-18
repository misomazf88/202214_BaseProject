import { CiudadEntity } from 'src/ciudad/ciudad.entity';
import { CiudadSupermercadoService } from './ciudad-supermercado.service';
import { Module } from '@nestjs/common';
import { SupermercadoEntity } from 'src/supermercado/supermercado.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CiudadSupermercadoController } from './ciudad-supermercado.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CiudadEntity, SupermercadoEntity])],
  providers: [CiudadSupermercadoService],
  controllers: [CiudadSupermercadoController]
})
export class CiudadSupermercadoModule { }
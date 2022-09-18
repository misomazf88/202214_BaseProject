import { CiudadEntity } from './ciudad.entity';
import { CiudadService } from './ciudad.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CiudadEntity])],
  providers: [CiudadService]
})
export class CiudadModule { }

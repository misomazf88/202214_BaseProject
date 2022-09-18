import { SupermercadoEntity } from './supermercado.entity';
import { SupermercadoService } from './supermercado.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SupermercadoEntity])],
  providers: [SupermercadoService]
})
export class SupermercadoModule { }

import { CiudadEntity } from 'src/ciudad/ciudad.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SupermercadoEntity } from 'src/supermercado/supermercado.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class CiudadSupermercadoService {

  /**
  * Crea instancias de Repository para entidades CiudadEntity y SupermercadoEntity.
  */
  constructor(
    @InjectRepository(CiudadEntity)
    private readonly ciudadRepository: Repository<CiudadEntity>,

    @InjectRepository(SupermercadoEntity)
    private readonly supermercadoRepository: Repository<SupermercadoEntity>
  ) { }

  /**
  * Asocia un supermercado a una ciudad.
  * @param ciudadId
  * @param supermercadoId
  * @returns CiudadEntity
  */
  async addSupermarketToCity(ciudadId: string, supermercadoId: string): Promise<CiudadEntity> {
    const supermercado: SupermercadoEntity = await this.supermercadoRepository.findOne({ where: { id: supermercadoId } });
    if (!supermercado)
      throw new BusinessLogicException("No se encontró el supermercado con la identificación dada", BusinessError.NOT_FOUND);
    const ciudad: CiudadEntity = await this.ciudadRepository.findOne({ where: { id: ciudadId }, relations: ["supermercados"] })
    if (!ciudad)
      throw new BusinessLogicException("No se encontró la ciudad con la identificación proporcionada.", BusinessError.NOT_FOUND);
    ciudad.supermercados = [...ciudad.supermercados, supermercado];
    return await this.ciudadRepository.save(supermercado);
  }
}
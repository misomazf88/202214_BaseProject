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
    return await this.ciudadRepository.save(ciudad);
  }

  /**
  * Obtiene los supermercados que tiene una ciudad.
  * @param ciudadId
  * @returns SupermercadoEntity[]
  */
  async findSupermarketsFromCity(ciudadId: string): Promise<SupermercadoEntity[]> {
    const ciudad: CiudadEntity = await this.ciudadRepository.findOne({ where: { id: ciudadId }, relations: ["supermercados"] });
    if (!ciudad)
      throw new BusinessLogicException("No se encontró la ciudad con la identificación proporcionada.", BusinessError.NOT_FOUND)
    return ciudad.supermercados;
  }

  /**
  * Obtiene un supermercado de una ciudad.
  * @param ciudadId
  * @param supermercadoId
  * @returns SupermercadoEntity
  */
  async findSupermarketFromCity(ciudadId: string, supermercadoId: string): Promise<SupermercadoEntity> {
    const supermercado: SupermercadoEntity = await this.supermercadoRepository.findOne({ where: { id: supermercadoId } });
    if (!supermercado)
      throw new BusinessLogicException("No se encontró el supermercado con la identificación dada", BusinessError.NOT_FOUND)
    const ciudad: CiudadEntity = await this.ciudadRepository.findOne({ where: { id: ciudadId }, relations: ["supermercados"] });
    if (!ciudad)
      throw new BusinessLogicException("No se encontró la ciudad con la identificación proporcionada.", BusinessError.NOT_FOUND)
    const supermercadoCiudad: SupermercadoEntity = ciudad.supermercados.find(e => e.id === supermercado.id);
    if (!supermercadoCiudad)
      throw new BusinessLogicException("El supermercado con el id proporcionado no está asociado a la ciudad.", BusinessError.PRECONDITION_FAILED)
    return supermercadoCiudad;
  }

  /**
  * Actualiza los supermercados que tiene una ciudad.
  * @param ciudadId
  * @param supermercadoId
  * @returns CiudadEntity
  */
  async updateSupermarketsFromCity(ciudadId: string, supermercados: SupermercadoEntity[]): Promise<CiudadEntity> {
    const ciudad: CiudadEntity = await this.ciudadRepository.findOne({ where: { id: ciudadId }, relations: ["supermercados"] });
    if (!ciudad)
      throw new BusinessLogicException("No se encontró la ciudad con la identificación proporcionada.", BusinessError.NOT_FOUND)
    for (let i = 0; i < supermercados.length; i++) {
      const supermercado: SupermercadoEntity = await this.supermercadoRepository.findOne({ where: { id: `${supermercados[i].id}` } });
      if (!supermercado)
        throw new BusinessLogicException("No se encontró el supermercado con la identificación dada", BusinessError.NOT_FOUND)
    }
    ciudad.supermercados = supermercados;
    return await this.ciudadRepository.save(ciudad);
  }

  /**
  * Elimina el supermercado que tiene una ciudad.
  * @param ciudadId
  * @param supermercadoId
  */
  async deleteSupermarketFromCity(ciudadId: string, supermercadoId: string) {
    const supermercado: SupermercadoEntity = await this.supermercadoRepository.findOne({ where: { id: supermercadoId } });
    if (!supermercado)
      throw new BusinessLogicException("No se encontró el supermercado con la identificación dada", BusinessError.NOT_FOUND)
    const ciudad: CiudadEntity = await this.ciudadRepository.findOne({ where: { id: ciudadId }, relations: ["supermercados"] });
    if (!ciudad)
      throw new BusinessLogicException("No se encontró la ciudad con la identificación proporcionada.", BusinessError.NOT_FOUND)
    const ciudadSupermercado: SupermercadoEntity = ciudad.supermercados.find(e => e.id === supermercado.id);

    if (!ciudadSupermercado)
      throw new BusinessLogicException("El supermercado con el id proporcionado no está asociada a la ciudad.", BusinessError.PRECONDITION_FAILED)

    ciudad.supermercados = ciudad.supermercados.filter(e => e.id !== supermercadoId);
    await this.ciudadRepository.save(ciudad);
  }
}
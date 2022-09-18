import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { SupermercadoEntity } from './supermercado.entity';

@Injectable()
export class SupermercadoService {

  /**
  * Crea instancia de Repository para entidad SupermercadoEntity.
  */
  constructor(
    @InjectRepository(SupermercadoEntity)
    private readonly supermercadoRepository: Repository<SupermercadoEntity>
  ) { }

  /**
  * Retorna un listado de supermercados a partir de las supermercados existentes en db.
  * @returns SupermercadoEntity[]
  */
  async findAll(): Promise<SupermercadoEntity[]> {
    return await this.supermercadoRepository.find({ relations: ["ciudad"] });
  }

  /**
  * Retorna un supermercado a partir del id recibido como parametro.
  * @param id
  * @returns SupermercadoEntity
  */
  async findOne(id: string): Promise<SupermercadoEntity> {
    const supermercado: SupermercadoEntity = await this.supermercadoRepository.findOne({ where: { id }, relations: ["ciudad"] });
    if (!supermercado)
      throw new BusinessLogicException("No se encontró el supermercado con la identificación proporcionada.", BusinessError.NOT_FOUND);
    return supermercado;
  }

  /**
  * Crea un supermercado a partir de json recibido en body con representacion de la supermercado a almacenar en db, se valida que el
  * nombre tenga mas de 10 caracteres, de lo contrario se lanza excepcion de negoico.
  * @param supermercado
  * @returns SupermercadoEntity
  */
  async create(supermercado: SupermercadoEntity): Promise<SupermercadoEntity> {
    if (supermercado.nombre.length <= 10)
      throw new BusinessLogicException("El nombre del supermercado debe tener mas de 10 caracteres.", BusinessError.PRECONDITION_FAILED);
    return await this.supermercadoRepository.save(supermercado);
  }

  /**
  * Actualiza una supermercado a partir de id y de json recibido en body con representacion de la supermercado a almacenar en db, se valida que el
  * nombre tenga mas de 10 caracteres, de lo contrario se lanza excepcion de negoico.
  * @param id
  * @param supermercado
  * @returns SupermercadoEntity
  */
  async update(id: string, supermercado: SupermercadoEntity): Promise<SupermercadoEntity> {
    //Se busca supermercado por id recibido en peticion.
    const persisteSupermercado: SupermercadoEntity = await this.supermercadoRepository.findOne({ where: { id } });
    if (!persisteSupermercado)
      throw new BusinessLogicException("No se encontró el supermercado con la identificación proporcionada.", BusinessError.NOT_FOUND);

    if (supermercado.nombre.length <= 10)
      throw new BusinessLogicException("El nombre del supermercado debe tener mas de 10 caracteres.", BusinessError.PRECONDITION_FAILED);
    //Se asigna id de db a objeto recibido en peticion.
    supermercado.id = id;
    //Se almacena objeto en db.
    return await this.supermercadoRepository.save(supermercado);
  }

  /**
  * Elimina una supermercado a partir de id, se valida que el supermercado exista en db de lo contrario se lanza excepcion de negoico.
  * @param id
  */
  async delete(id: string) {
    //Se busca supermercado por id recibido en peticion.
    const supermercado: SupermercadoEntity = await this.supermercadoRepository.findOne({ where: { id } });
    //Si no existe la supermercado se lanza excepcion de negocio.
    if (!supermercado)
      throw new BusinessLogicException("No se encontró el supermercado con la identificación proporcionada.", BusinessError.NOT_FOUND);
    await this.supermercadoRepository.remove(supermercado);
  }
}
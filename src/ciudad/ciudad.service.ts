import { CiudadEntity } from './ciudad.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business.errors';
import { Pais } from 'src/shared/enums/Pais';

@Injectable()
export class CiudadService {

  /**
  * Crea instancia de Repository para entidad CiudadEntity.
  */
  constructor(
    @InjectRepository(CiudadEntity)
    private readonly ciudadRepository: Repository<CiudadEntity>
  ) { }

  /**
  * Retorna un listado de ciudades a partir de las ciudades existentes en db.
  * @returns CiudadEntity[]
  */
  async findAll(): Promise<CiudadEntity[]> {
    return await this.ciudadRepository.find({ relations: ["supermercados"] });
  }

  /**
  * Retorna una ciudad a partir del id recibido como parametro.
  * @param id
  * @returns CiudadEntity
  */
  async findOne(id: string): Promise<CiudadEntity> {
    const ciudad: CiudadEntity = await this.ciudadRepository.findOne({ where: { id }, relations: ["supermercados"] });
    if (!ciudad)
      throw new BusinessLogicException("No se encontró la ciudad con la identificación proporcionada.", BusinessError.NOT_FOUND);
    return ciudad;
  }

  /**
  * Crea una ciudad a partir de json recibido en body con representacion de la ciudad a almacenar en db, se valida que la ciudad este
  * en alguno de los paises (Argentina, Ecuador, Paraguay) de lo contrario se lanza excepcion de negoico.
  * @param ciudad
  * @returns CiudadEntity
  */
  async create(ciudad: CiudadEntity): Promise<CiudadEntity> {
    if (ciudad.pais != Pais.Argentina && ciudad.pais != Pais.Ecuador && ciudad.pais != Pais.Paraguay)
      throw new BusinessLogicException("El pais ingresado no corresponde a uno valido.", BusinessError.PRECONDITION_FAILED);
    return await this.ciudadRepository.save(ciudad);
  }

  /**
  * Actualiza una ciudad a partir de id y de json recibido en body con representacion de la ciudad a almacenar en db, se valida que la ciudad este
  * en alguno de los paises (Argentina, Ecuador, Paraguay) de lo contrario se lanza excepcion de negoico.
  * @param id
  * @param ciudad
  * @returns CiudadEntity
  */
  async update(id: string, ciudad: CiudadEntity): Promise<CiudadEntity> {
    //Se busca ciudad por id recibido en peticion.
    const persisteCiudad: CiudadEntity = await this.ciudadRepository.findOne({ where: { id } });
    if (!persisteCiudad)
      throw new BusinessLogicException("No se encontró la ciudad con la identificación proporcionada.", BusinessError.NOT_FOUND);

    if (ciudad.pais != Pais.Argentina && ciudad.pais != Pais.Ecuador && ciudad.pais != Pais.Paraguay)
      throw new BusinessLogicException("El pais ingresado no corresponde a uno valido.", BusinessError.PRECONDITION_FAILED);
    //Se asigna id de db a objeto recibido en peticion.
    ciudad.id = id;
    //Se almacena objeto en db.
    return await this.ciudadRepository.save(ciudad);
  }

  async delete(id: string) {
    //Se busca ciudad por id recibido en peticion.
    const ciudad: CiudadEntity = await this.ciudadRepository.findOne({ where: { id } });
    //Si no existe la ciudad se lanza excepcion de negocio.
    if (!ciudad)
      throw new BusinessLogicException("No se encontró la ciudad con la identificación proporcionada.", BusinessError.NOT_FOUND);
    await this.ciudadRepository.remove(ciudad);
  }
}
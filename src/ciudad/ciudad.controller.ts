import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { CiudadDto } from './ciudad.dto';
import { CiudadEntity } from './ciudad.entity';
import { CiudadService } from './ciudad.service';

@Controller('cities')
@UseInterceptors(BusinessErrorsInterceptor)
export class CiudadController {

  /**
  * Crea instancia de Repository para service CiudadService.
  */
  constructor(private readonly ciudadService: CiudadService) { }

  /**
  * Retorna un listado de ciudades a partir de las ciudades existentes en db.
  * @returns CiudadEntity[]
  */
  @Get()
  async findAll() {
    return await this.ciudadService.findAll();
  }

  /**
  * Retorna una ciudad a partir del id recibido como parametro.
  * @param ciudadId
  * @returns CiudadEntity
  */
  @Get(':ciudadId')
  async findOne(@Param('ciudadId') ciudadId: string) {
    return await this.ciudadService.findOne(ciudadId);
  }

  /**
  * Crea una ciudad a partir de json recibido en body con representacion de la ciudad a almacenar en db, se valida que la ciudad este
  * en alguno de los paises (Argentina, Ecuador, Paraguay) de lo contrario se lanza excepcion de negoico.
  * @param ciudadDto
  * @returns CiudadEntity
  */
  @Post()
  async create(@Body() ciudadDto: CiudadDto) {
    const ciudad: CiudadEntity = plainToInstance(CiudadEntity, ciudadDto);
    return await this.ciudadService.create(ciudad);
  }

  /**
  * Actualiza una ciudad a partir de id y de json recibido en body con representacion de la ciudad a almacenar en db, se valida que la ciudad este
  * en alguno de los paises (Argentina, Ecuador, Paraguay) de lo contrario se lanza excepcion de negoico.
  * @param ciudadId
  * @param ciudadDto
  * @returns CiudadEntity
  */
  @Put(':ciudadId')
  async update(@Param('ciudadId') ciudadId: string, @Body() ciudadDto: CiudadDto) {
    const ciudad: CiudadEntity = plainToInstance(CiudadEntity, ciudadDto);
    return await this.ciudadService.update(ciudadId, ciudad);
  }

  /**
  * Elimina una ciudad a partir de id se valida que la ciudad exista en db de lo contrario se lanza excepcion de negoico.
  * @param ciudadId
  */
  @Delete(':ciudadId')
  @HttpCode(204)
  async delete(@Param('ciudadId') ciudadId: string) {
    return await this.ciudadService.delete(ciudadId);
  }
}
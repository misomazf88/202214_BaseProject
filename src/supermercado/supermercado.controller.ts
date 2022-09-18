import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { SupermercadoDto } from './supermercado.dto';
import { SupermercadoEntity } from './supermercado.entity';
import { SupermercadoService } from './supermercado.service';

@Controller('supermercado')
@UseInterceptors(BusinessErrorsInterceptor)
export class SupermercadoController {

  /**
  * Crea instancia de Repository para service SupermercadoService.
  */
  constructor(private readonly supermercadoService: SupermercadoService) { }

  /**
  * Retorna un listado de supermercados a partir de los supermercados existentes en db.
  * @returns SupermercadoEntity[]
  */
  @Get()
  async findAll() {
    return await this.supermercadoService.findAll();
  }

  /**
  * Retorna un supermercado a partir del id recibido como parametro.
  * @param supermercadoId
  * @returns SupermercadoEntity
  */
  @Get(':supermercadoId')
  async findOne(@Param('supermercadoId') supermercadoId: string) {
    return await this.supermercadoService.findOne(supermercadoId);
  }

  /**
 * Crea un supermercado a partir de json recibido en body con representacion de la supermercado a almacenar en db, se valida que el
 * nombre tenga mas de 10 caracteres, de lo contrario se lanza excepcion de negoico.
 * @param supermercadoDto
 * @returns SupermercadoEntity
 */
  @Post()
  async create(@Body() supermercadoDto: SupermercadoDto) {
    const ciudad: SupermercadoEntity = plainToInstance(SupermercadoEntity, supermercadoDto);
    return await this.supermercadoService.create(ciudad);
  }

  /**
 * Actualiza una supermercado a partir de id y de json recibido en body con representacion de la supermercado a almacenar en db, se valida que el
 * nombre tenga mas de 10 caracteres, de lo contrario se lanza excepcion de negoico.
 * @param supermercadoId
 * @param supermercadoDto
 * @returns SupermercadoEntity
 */
  @Put(':supermercadoId')
  async update(@Param('supermercadoId') supermercadoId: string, @Body() supermercadoDto: SupermercadoDto) {
    const ciudad: SupermercadoEntity = plainToInstance(SupermercadoEntity, supermercadoDto);
    return await this.supermercadoService.update(supermercadoId, ciudad);
  }

  /**
 * Elimina una supermercado a partir de id, se valida que el supermercado exista en db de lo contrario se lanza excepcion de negoico.
 * @param supermercadoId
 */
  @Delete(':supermercadoId')
  @HttpCode(204)
  async delete(@Param('supermercadoId') supermercadoId: string) {
    return await this.supermercadoService.delete(supermercadoId);
  }
}
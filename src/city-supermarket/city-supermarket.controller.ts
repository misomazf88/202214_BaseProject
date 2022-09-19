import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { CitySupermarketService } from './city-supermarket.service';

@Controller('city-supermarket')
@UseInterceptors(BusinessErrorsInterceptor)
export class CitySupermarketController {

  /**
  * Crea instancia citySupermarketService.
  */
  constructor(private readonly citySupermarketService: CitySupermarketService) { }

  /**
  * Obtiene un supermercado de una ciudad.
  * @param cityId
  * @param supermarketId
  * @returns SupermarketEntity
  */
  @Get('cities/:cityId/supermarkets/:supermarketId')
  async findSupermarketFromCity(@Param('cityId') cityId: string, @Param('supermarketId') supermarketId: string) {
    return await this.citySupermarketService.findSupermarketFromCity(cityId, supermarketId);
  }

  /**
  * Asocia un supermercado a una ciudad.
  * @param cityId
  * @param supermarketId
  * @returns CityEntity
  */
  @Post(':cityId/supermarkets/:supermarketId')
  async addSupermarketToCity(@Param('cityId') cityId: string, @Param('supermarketId') supermarketId: string) {
    return await this.citySupermarketService.addSupermarketToCity(cityId, supermarketId);
  }

  /**
  * Obtiene los supermercados que tiene una ciudad.
  * @param cityId
  * @returns SupermarketEntity[]
  */
   @Get(':cityId')
   async findSupermarketsFromCity(@Param('cityId') cityId: string) {
     return await this.citySupermarketService.findSupermarketsFromCity(cityId);
   }
}

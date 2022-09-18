import { Test, TestingModule } from '@nestjs/testing';
import { CitySupermarketService } from './city-supermarket.service';

describe('CiudadSupermercadoService', () => {
  let service: CitySupermarketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CitySupermarketService],
    }).compile();

    service = module.get<CitySupermarketService>(CitySupermarketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

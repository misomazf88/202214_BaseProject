import { Test, TestingModule } from '@nestjs/testing';
import { SupermermarketService } from './supermarket.service';

describe('SupermercadoService', () => {
  let service: SupermermarketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupermermarketService],
    }).compile();

    service = module.get<SupermermarketService>(SupermermarketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

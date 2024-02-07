import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StockInfoService } from '../../src/modules/stockInfoList/stockInfo.service';
import { StockInfo } from '../../src/modules/stockInfoList/stockInfo.entity';
import { MarketDataService } from '../../src/modules/stockInfoList/market-data.service';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { ResponseDto } from '../../src/modules/stockInfoList/dto/response.dto';

// 外部APIのモック関数
jest.mock('../../src/service/external-api', () => ({
  getMarketPrice: jest.fn(),
  getFinancialData: jest.fn(),
}));

// TestData
const test_data1 = {
  code: '23750',
  companyname: 'ギグワークス',
  sectorCode: '10',
  page: 1,
};
const test_data2 = {
  code: '23750',
  companyname: 'ギグワークス',
  sectorCode: '10',
  page: 3,
};

//expect
const success: any = {
  code: '23750',
  companyname: 'ギグワークス',
  id: 529,
  marketcode: '0112',
  marketcodename: 'スタンダード',
  marketprice: [
    {
      Date: '2023-11-15',
      Code: '23750',
      Open: 1030,
      High: 1052,
      Low: 930,
      Close: 963,
      UpperLimit: '0',
      LowerLimit: '0',
      Volume: 4537100,
      TurnoverValue: 4515509300,
      AdjustmentFactor: 1,
      AdjustmentOpen: 1030,
      AdjustmentHigh: 1052,
      AdjustmentLow: 930,
      AdjustmentClose: 963,
      AdjustmentVolume: 4537100,
    },
  ],
  sector17code: '10',
  sector17codename: '情報通信・サービスその他',
};

const expectReturnValue = new ResponseDto(success, 1, 1, '200', '');

describe('StockInfoService', () => {
  let service: StockInfoService;
  let mockStockInfoRepository: Partial<Repository<StockInfo>>;
  let mockMarketDataService: Partial<MarketDataService>;

  beforeEach(async () => {
    const mockSelectQueryBuilder: Partial<SelectQueryBuilder<StockInfo>> = {
      andWhere: jest.fn().mockReturnThis(),
      getCount: jest.fn().mockResolvedValue(1),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue([]),
    };

    mockStockInfoRepository = {
      createQueryBuilder: jest.fn(() => mockSelectQueryBuilder as any),
    };

    mockMarketDataService = {
      saveMarketData: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StockInfoService,
        {
          provide: getRepositoryToken(StockInfo),
          useValue: mockStockInfoRepository,
        },
        {
          provide: MarketDataService,
          useValue: mockMarketDataService,
        },
      ],
    }).compile();

    service = module.get<StockInfoService>(StockInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //findAll関数のユニットテスト
  //正常系(1.引数なし、2.全て引数あり,page = 1, 3.page = 2
  //異常系(4.code存在しないcode, 5.company存在しない, 6.7.同様,
  describe('findAll', () => {
    it('テストケース1: 正常系 引数なし', async () => {
      const result = await service.findAll();
      expect(result).toBeDefined();
      expect(
        mockStockInfoRepository.createQueryBuilder().getMany,
      ).toHaveBeenCalled();
    });
    it('テストケース2: 正常系 引数あり', async () => {
      const result = await service.findAll(
        test_data1.code,
        test_data1.companyname,
        test_data1.sectorCode,
        test_data1.page,
      );
      expect(result).toBeDefined();
      expect(
        mockStockInfoRepository.createQueryBuilder().getMany,
      ).toHaveBeenCalled();
      expect(result).toEqual(expectReturnValue);
    });
    it('テストケース3: 正常系 引数あり', async () => {
      const result = await service.findAll(
        test_data2.code,
        test_data2.companyname,
        test_data2.sectorCode,
        test_data2.page,
      );
      expect(result).toBeDefined();
      expect(
        mockStockInfoRepository.createQueryBuilder().getMany,
      ).toHaveBeenCalled();
    });
    it('テストケース4: 異常系 code不正値', async () => {
      const result = await service.findAll('aaaaaaa');
      expect(result).toBeDefined();
      expect(
        mockStockInfoRepository.createQueryBuilder().getMany,
      ).toHaveBeenCalled();
    });
    it('テストケース5: 異常系 companyname不正', async () => {
      const result = await service.findAll('aaaaaaa');
      expect(result).toBeDefined();
      expect(
        mockStockInfoRepository.createQueryBuilder().getMany,
      ).toHaveBeenCalled();
    });
    it('テストケース6: 異常系 selector17code不正値', async () => {
      const result = await service.findAll('aaaaaaa');
      expect(result).toBeDefined();
      expect(
        mockStockInfoRepository.createQueryBuilder().getMany,
      ).toHaveBeenCalled();
    });
    it('テストケース7: 異常系 page不正値', async () => {
      const result = await service.findAll('a');
      expect(result).toBeDefined();
      expect(
        mockStockInfoRepository.createQueryBuilder().getMany,
      ).toHaveBeenCalled();
    });
  });
});

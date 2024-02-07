import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { ResponseDto } from './dto/response.dto';

@Injectable()
export class StockInfoDetailService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async getDetailCompanyFinancialData(code?: string): Promise<any> {
    if (!code || code === '') {
      return new ResponseDto({}, '400', 'Bad Request');
    }
    const financialJsonData = await this.getDetailCompanyDataFromRedis(code);
    return new ResponseDto(financialJsonData, '200', '');
  }

  async getDetailCompanyDataFromRedis(code?: string): Promise<any> {
    const redisKey = `code:${code}`;
    const redisFinancialData = await this.redis.get(redisKey);

    if (!redisFinancialData) {
      return null;
    }

    try {
      const financialJsonData = JSON.parse(redisFinancialData);
      return financialJsonData;
    } catch (error) {
      console.error('JSON parsing error', error);
      return null;
    }
  }
}

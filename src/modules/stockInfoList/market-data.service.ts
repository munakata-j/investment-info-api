import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class MarketDataService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async saveMarketData(data: any, code: string): Promise<void> {
    const key = `code:${code}`;
    await this.redis.set(key, JSON.stringify(data));
  }

  async getMarketData(code: string): Promise<any> {
    const key = `code:${code}`;
    const data = await this.redis.get(key);
    return JSON.parse(data);
  }

  async saveFinancialRedisData(data: any, code: string) {
    const key = `financialData_code:${code}`;
    await this.redis.set(key, JSON.stringify(data));
  }

  async getFinancialRedisData(code: string) {
    const key = `financialData_code:${code}`;
    const data = await this.redis.get(key);
    return JSON.parse(data);
  }

  async flushDb(): Promise<void> {
    await this.redis.flushdb();
  }

  async flushAll(): Promise<void> {
    await this.redis.flushall();
  }
}

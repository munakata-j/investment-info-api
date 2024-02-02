import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockInfoModule } from './modules/stockInfoList/stockInfo.module';
import { StockInfo } from './modules/stockInfoList/stockInfo.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // アプリケーション全体でConfigModuleを利用可能にします
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        entities: [StockInfo],
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USERNAME || 'postgres',
        password: process.env.DATABASE_PASSWORD || 'haru-0612',
        database: process.env.DATABASE_NAME,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    StockInfoModule,
  ],
})
export class AppModule {}

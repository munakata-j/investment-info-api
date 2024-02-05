// stock-info.dto.ts
import { StockInfo } from '../stockInfo.entity';

export class GetStockInfoDto {
  id: number;
  code: string;
  companyname: string;
  sector17code: string;
  sector17codename: string;
  marketcode: string;
  marketcodename: string;
  marketprice: number;

  constructor(partial: GetStockInfoDto) {
    Object.assign(this, partial);
  }
}

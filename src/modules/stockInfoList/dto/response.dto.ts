import { GetStockInfoDto } from './get-stockInfo.dto';

export class ResponseDto {
  data: GetStockInfoDto[];
  size: number;
  page: number;
  code: string;
  msg: string;

  constructor(data: GetStockInfoDto[], size: number, page: number, code, msg) {
    this.data = data;
    this.size = size;
    this.page = page;
    this.code = code;
    this.msg = msg;
  }
}

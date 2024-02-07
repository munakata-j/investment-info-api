import { GetStockInfoDetailDto } from './get-stockInfoDetail.dto';

export class ResponseDto {
  code: string;
  msg: string;
  data: GetStockInfoDetailDto;

  constructor(data: GetStockInfoDetailDto, code: string, msg: string) {
    this.data = data;
    this.code = code;
    this.msg = msg;
  }
}

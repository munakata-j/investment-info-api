import { GetStockInfoDto } from "./get-stockInfo.dto";

export class ResponseDto {
  data: GetStockInfoDto[];
  size: number;
  page: number;

  constructor(data: GetStockInfoDto[], size: number, page: number) {
    this.data = data;
    this.size = size;
    this.page = page;
  }
}

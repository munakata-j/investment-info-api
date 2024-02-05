import { Controller, Post, Body } from '@nestjs/common';
import { CsvExportService } from './exportToCsv.service';

@Controller()
export class exportToCsvController {
  constructor(private readonly csvExportService: CsvExportService) {}

  @Post('export')
  async exportCsv(@Body('codes') codes: string[]): Promise<string> {
    return this.csvExportService.exportData(codes);
  }
}

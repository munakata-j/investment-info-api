import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { CsvExportService } from './exportToCsv.service';

@Controller()
export class exportToCsvController {
  constructor(private readonly csvExportService: CsvExportService) {}

  @Post('export')
  async generateCSV(@Res() res: Response, @Body('codes') codes: string[]) {
    try {
      const csvData = await this.csvExportService.exportData(codes);

      res.status(HttpStatus.OK);
      res.header('Content-Type', '');
      res.header(
        'Content-Disposition',
        'attachment; filename="financial_data.csv"',
      );
      res.send({
        code: '200',
        msg: '',
        data: csvData,
      });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        error: error.message,
      });
    }
  }
}

import { Module } from '@nestjs/common';
import { CsvExportService } from './exportToCsv.service';
import { exportToCsvController } from './exportTocsv.controller';

@Module({
  providers: [CsvExportService],
  controllers: [exportToCsvController],
})
export class exportToCsvModule {}

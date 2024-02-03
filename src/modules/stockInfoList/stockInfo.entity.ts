import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'jp_stockinfo', schema: 'jpstock' })
export class StockInfo {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ length: 255 })
  code: string;

  @Column({ length: 255 })
  companyname: string;

  @Column({ length: 255 })
  companynameenglish: string;

  @Column({ length: 255 })
  sector17code: string;

  @Column({ length: 255 })
  sector17codename: string;

  @Column({ length: 255 })
  marketcode: string;

  @Column({ length: 255 })
  marketcodename: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  registrationdate: Date;
}

import { CustomerEntity } from '../../customers/entities/customer.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('findcustomers')
export class FindCustomerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'date_find',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateOfFind: Date;

  @ManyToOne(() => CustomerEntity, (customer) => customer.finders, {
    eager: true,
  })
  finder: CustomerEntity;

  @ManyToOne(() => CustomerEntity, (customer) => customer.objects, {
    eager: true,
  })
  object: CustomerEntity;
}

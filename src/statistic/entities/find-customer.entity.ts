import { CustomerEntity } from '@app/customers/entities/customer.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('findcustomers')
export class FindCustomerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_find: Date;

  @Column({ nullable: true, type: 'int' })
  finder_id: number;

  @Column({ nullable: true, type: 'int' })
  object_id: number;

  @ManyToOne(() => CustomerEntity, (customer) => customer.finders, {
    eager: true,
  })
  finder: CustomerEntity;

  @ManyToOne(() => CustomerEntity, (customer) => customer.findObjects, {
    eager: true,
  })
  object: CustomerEntity;
}

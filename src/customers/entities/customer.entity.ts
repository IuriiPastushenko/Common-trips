import { FindCustomerEntity } from '@app/statistic/entities/find-customer.entity';
import { hash } from 'bcrypt';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CustomersRole } from '../enums/role.enum';

@Entity('customers')
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  first_name: string;

  @Column({ type: 'varchar' })
  second_name: string;

  @Column({ nullable: true, type: 'varchar' })
  gender: string;

  @Column({ nullable: true, type: 'int' })
  year_of_birth: number;

  @Column({ unique: true, type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ unique: true, type: 'varchar' })
  phone_number: string;

  @Column({ default: '', type: 'varchar' })
  image: string;

  @Column({ nullable: true, type: 'varchar' })
  сar_name: string;

  @Column({ nullable: true, type: 'int' })
  year_of_of_the_car: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_date: Date;

  @UpdateDateColumn()
  update_date: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
  @Column('simple-array', { default: CustomersRole.user })
  roles: string[];

  @OneToMany(() => FindCustomerEntity, (finder) => finder.finder_id)
  finders: FindCustomerEntity[];

  @OneToMany(() => FindCustomerEntity, (findObject) => findObject.object_id)
  findObjects: FindCustomerEntity[];
}

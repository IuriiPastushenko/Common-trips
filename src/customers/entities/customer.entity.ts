import { FindCustomerEntity } from '../../statistic/entities/find-customer.entity';
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

  @Column({ name: 'first_name', type: 'varchar' })
  firstName: string;

  @Column({ name: 'second_name', type: 'varchar' })
  secondName: string;

  @Column({ nullable: true, type: 'varchar' })
  gender: string;

  @Column({ name: 'year_of_birth', nullable: true, type: 'int' })
  yearOfBirth: number;

  @Column({ unique: true, type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ name: 'phone_number', unique: true, type: 'varchar' })
  phoneNumber: string;

  @Column({ default: '', type: 'varchar' })
  image: string;

  @Column({ name: 'car_name', nullable: true, type: 'varchar' })
  сarName: string;

  @Column({ name: 'year_of_of_the_car', nullable: true, type: 'int' })
  yearOfTheCar: number;

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

  @OneToMany(() => FindCustomerEntity, (history) => history.finder)
  finders: FindCustomerEntity[];

  @OneToMany(() => FindCustomerEntity, (history) => history.object)
  objects: FindCustomerEntity[];
}

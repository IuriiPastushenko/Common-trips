import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('drivers')
export class DriverEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  secondName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phoneNumber: number;

  @Column({ default: '' })
  image: string;

  @Column()
  сarName: string;

  @Column()
  yearOfManufactureOfTheMachine: number;

  @Column()
  password: string;

  // @BeforeInsert()
  // async hashPassword() {
  //   this.password = await hash(this.password, 10);
  // }
}

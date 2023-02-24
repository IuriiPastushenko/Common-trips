import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('trips')
export class TripEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startpoint: string;

  @Column()
  startlng: number;

  @Column()
  startlat: number;

  @Column()
  startdate: Date;

  @Column()
  finishpoint: string;

  @Column()
  finishlng: number;

  @Column()
  finishlat: number;

  @Column()
  finishdate: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  driverID: number;

  @Column()
  maxpassengers: number;

  @Column('simple-array')
  passengersID: number[];
}

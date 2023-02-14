import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  ManyToMany,
} from 'typeorm';
import { Info } from './device-info.entity';
import { User } from './user.entity';

@Entity()
export class Device {
  @PrimaryGeneratedColumn()
  @Exclude()
  _id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  madeBy: string;

  @Column()
  photoUrl: string;

  @OneToOne(() => Info, (info) => info.device, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  info: Info;

  @ManyToMany(() => User, (user) => user.devices)
  users: User[];
}

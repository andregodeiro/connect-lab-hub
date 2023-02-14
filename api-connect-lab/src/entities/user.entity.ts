import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Device } from './device.entity';
import { Address } from './user-address.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  fullName: string;

  @Column({ length: 255, nullable: true })
  photoUrl: string;

  @Column({ length: 255, unique: true, nullable: false })
  email: string;

  @Column({ length: 255, nullable: false })
  @Exclude()
  password: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  @OneToOne(() => Address, (address) => address.user)
  @JoinColumn()
  address: Address;

  @OneToMany(() => Device, (device) => device.users, {
    cascade: true,
  })
  @JoinTable({
    name: 'user_devices',
  })
  devices: Device[];
}

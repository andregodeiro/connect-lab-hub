import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Device } from './device.entity';

@Entity()
export class UserDevices {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.devices)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Device, (devices) => devices.users)
  @JoinColumn({ name: 'device_id' })
  device: Device;

  @Column({ name: 'location' })
  location: string;

  @Column({ name: 'status' })
  status: string;
}

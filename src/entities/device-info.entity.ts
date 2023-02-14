import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Device } from './device.entity';

@Entity()
export class Info {
  @PrimaryGeneratedColumn()
  virtual_id: number;

  @Column()
  ip_address: string;

  @Column()
  mac_address: string;

  @Column()
  signal: string;

  @OneToOne(() => Device, (device) => device.info)
  device: Device;
}

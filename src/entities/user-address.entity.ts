import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 8, nullable: false })
  zipCode: string;

  @Column({ length: 255, nullable: false })
  street: string;

  @Column({ length: 20, nullable: false })
  number: string;

  @Column({ length: 100, nullable: false })
  neighborhood: string;

  @Column({ length: 100, nullable: false })
  city: string;

  @Column({ length: 2, nullable: false })
  state: string;

  @Column({ length: 100, nullable: true })
  complement: string;

  @OneToOne(() => User, (user) => user.address)
  user: User;
}

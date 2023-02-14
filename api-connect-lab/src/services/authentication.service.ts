import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { User } from '../entities/user.entity';
import { LoginDto } from '../dto/login.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async validateUser(dto: LoginDto): Promise<string | User> {
    const options: FindOneOptions = {
      where: { email: dto.email },
    };
    const user = await this.userRepository.findOne(options);
    if (!user) {
      return 'Email ou senha inválidos';
    }
    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) {
      return 'Email ou senha inválidos';
    }
    return user;
  }

  async login(user: User): Promise<string> {
    const payload = {
      userId: user.id,
      fullName: user.fullName,
      photoUrl: user.photoUrl,
      email: user.email,
      password: user.password,
    };
    return jwt.sign(payload, process.env.JWT_SECRET);
  }
}

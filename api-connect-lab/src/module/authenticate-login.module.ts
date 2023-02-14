import { Module } from '@nestjs/common';
import { AuthService } from '../services/authentication.service';
import { AuthController } from '../controllers/authentication.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Address } from 'src/entities/user-address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Address])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthenticationModule {}

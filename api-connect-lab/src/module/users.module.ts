import { Module } from '@nestjs/common';
import { UsersController } from 'src/controllers/users.controller';
import { UsersService } from '../services/users.services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Address } from '../entities/user-address.entity';
import { UserDevices } from 'src/entities/user-devices.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { AuthService } from '../services/authentication.service';
import { DevicesService } from 'src/services/devices.service';
import { Device } from 'src/entities/device.entity';
import { Info } from 'src/entities/device-info.entity';

export const passportModule = PassportModule.register({
  defaultStrategy: 'jwt',
});

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Address, UserDevices, Device, Info]),
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
      signOptions: { expiresIn: '60s' },
    }),
    passportModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy, AuthService, DevicesService],
})
export class UsersModule {}

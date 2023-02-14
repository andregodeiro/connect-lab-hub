import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevicesController } from '../controllers/devices.controller';
import { DevicesService } from '../services/devices.service';
import { Device } from '../entities/device.entity';
import { Info } from '../entities/device-info.entity';
import { User } from 'src/entities/user.entity';
import { UserDevices } from 'src/entities/user-devices.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Device, Info, User, UserDevices])],
  controllers: [DevicesController],
  providers: [DevicesService],
})
export class DevicesModule {}

import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LinkDeviceDto } from 'src/dto/link-device.dto';
import { CreateDeviceDto } from '../dto/create-device.dto';
import { Device } from '../entities/device.entity';
import { DevicesService } from '../services/devices.service';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Get()
  async findAll(): Promise<Device[]> {
    return await this.devicesService.findAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: number) {
    return await this.devicesService.getById(id);
  }

  @Post()
  async create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.devicesService.create(createDeviceDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('link')
  async linkDevice(@Body() linkDeviceDto: LinkDeviceDto): Promise<string> {
    return this.devicesService.linkDeviceToUser(
      linkDeviceDto.userId,
      linkDeviceDto.deviceId,
      linkDeviceDto.location,
      linkDeviceDto.status,
    );
  }
}

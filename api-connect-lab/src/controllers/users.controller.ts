import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  Query,
  Param,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/authentication.service';
import { UsersService } from '../services/users.services';
import { CreateUserDto } from '../dto/create-user.dto';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { DevicesService } from 'src/services/devices.service';
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
    private readonly devicesService: DevicesService,
  ) {}

  @Post('signup')
  async create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Req() req) {
    const user = await this.userService.getProfile(req.user.userId);
    return user;
  }

  @Post('change-password')
  @UseGuards(AuthGuard('jwt'))
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Req() req,
  ) {
    const payload = req.user;

    return await this.userService.changePassword(changePasswordDto, payload);
  }

  @Get('devices')
  @UseGuards(AuthGuard('jwt'))
  async getDevices(@Req() req, @Query('location') location?: string) {
    const devices = await this.devicesService.getDevices(
      req.user.userId,
      location,
    );
    return devices;
  }

  @Get('devices/:id')
  @UseGuards(AuthGuard('jwt'))
  async detailDevice(@Req() req, @Param('id') id: number) {
    return this.devicesService.detailDevice(id, req.user.userId);
  }

  @Patch('devices/:id')
  @UseGuards(AuthGuard('jwt'))
  async udateDeviceStatus(@Req() req, @Param('id') id: number) {
    console.log('ID: ', id);
    console.log('userId: ', req.user.userId);
    return this.devicesService.updateDeviceStatus(id, req.user.userId);
  }
}

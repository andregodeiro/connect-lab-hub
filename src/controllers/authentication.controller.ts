import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from '../services/authentication.service';
import { LoginDto } from '../dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validateUser(dto);
    if (typeof user === 'string') {
      throw new HttpException(user, HttpStatus.UNAUTHORIZED);
    }
    return this.authService.login(user);
  }
}

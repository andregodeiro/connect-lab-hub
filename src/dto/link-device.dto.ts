import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class LinkDeviceDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  deviceId: number;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}

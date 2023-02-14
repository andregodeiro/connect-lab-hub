import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDeviceDto {
  @IsString()
  @IsNotEmpty()
  ip_address: string;

  @IsString()
  @IsNotEmpty()
  mac_address: string;

  @IsString()
  signal: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  madeBy: string;

  @IsString()
  photoUrl: string;
}

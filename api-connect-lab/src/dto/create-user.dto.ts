import { IsString, IsEmail, Length, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(1, 100)
  fullName: string;

  @IsString()
  @IsOptional()
  @Length(1, 255)
  photoUrl: string;

  @IsString()
  @IsEmail()
  @Length(1, 255)
  email: string;

  @IsString()
  @Length(8)
  password: string;

  @IsString()
  @IsOptional()
  @Length(8)
  confirmPassword: string;

  @IsString()
  @IsOptional()
  @Length(1, 20)
  phone: string;

  @IsString()
  @Length(8)
  zipCode: string;

  @IsString()
  @Length(1, 255)
  street: string;

  @IsString()
  @Length(1, 20)
  number: string;

  @IsString()
  @Length(1, 100)
  neighborhood: string;

  @IsString()
  @Length(1, 100)
  city: string;

  @IsString()
  @Length(2)
  state: string;

  @IsString()
  @IsOptional()
  @Length(1, 100)
  complement: string;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  Matches,
  IsString,
  IsNumber,
} from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  userName: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  address: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  city: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  zipCode: number;

  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[0-9])/, {
    message: 'Password Must Contain At Least One Number',
  })
  @IsNotEmpty()
  @ApiProperty({ type: String })
  password: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  email: string;
}

export class UserDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  userName: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ type: Date })
  createdAt: Date;
}
export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  userName: string;

  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[0-9])/, {
    message: 'Password Must Contain At Least One Number',
  })
  @IsNotEmpty()
  @ApiProperty({ type: String })
  password: string;
}

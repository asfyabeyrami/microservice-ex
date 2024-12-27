import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
export class RegisterDto {
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
  @ApiProperty({ type: Number })
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

export class RefreshTokenDto {
  @IsString()
  refreshToken: string;
}

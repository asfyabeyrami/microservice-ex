import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Res,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoginDto, RefreshTokenDto, RegisterDto } from './gateway.dto';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('gateWay')
export class GatewayController {
  private client: ClientProxy;
  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 4200,
      },
    });
  }

  // signup root
  @ApiOperation({
    summary: 'ثبت نام کاربر جدید',
  })
  @ApiBody({
    type: RegisterDto,
    description: 'RegisterDto',
  })
  @ApiInternalServerErrorResponse({
    description: 'خطایی رخ داده است',
  })
  @Post('signup')
  async register(@Body() registerDto: RegisterDto) {
    return this.client.send({ cmd: 'AUTH_REGISTER' }, registerDto);
  }

  // login root
  @ApiOperation({
    summary: 'ورود کاربر ',
  })
  @ApiBody({
    type: LoginDto,
    description: 'LoginDto',
  })
  @ApiInternalServerErrorResponse({
    description: 'خطایی رخ داده است',
  })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.client.send({ cmd: 'AUTH_LOGIN' }, loginDto);
  }
  // REFRESH_TOKEN

  @Post('refresh-token')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.client.send({ cmd: 'REFRESH_TOKEN' }, refreshTokenDto);
  }

  // find user root
  @ApiOperation({
    summary: 'find user with id',
  })
  @ApiInternalServerErrorResponse({
    description: 'خطایی رخ داده است',
  })
  @Get(':id')
  findUser(@Param('id') id: number) {
    return this.client.send({ cmd: 'GET_USER' }, { id });
  }

  // get all user
  @ApiOperation({
    summary: 'get all users',
  })
  @ApiInternalServerErrorResponse({
    description: 'خطایی رخ داده است',
  })
  @Get()
  findAll() {
    return this.client.send({ cmd: 'GET_ALL_USERS' }, {});
  }

  // delete user root
  @ApiOperation({
    summary: 'حذف کاربر',
  })
  @ApiInternalServerErrorResponse({
    description: 'خطایی رخ داده است',
  })
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.client.send({ cmd: 'DELETE_USER' }, { id });
  }
}

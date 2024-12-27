import { Controller } from '@nestjs/common';
import { CreateUserDto, LoginDto, UserDto } from './DTO/user.dto';
import { UsersService } from './users.service';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOperation,
} from '@nestjs/swagger';
// import { Request, Response } from 'express';
import { MessagePattern } from '@nestjs/microservices';
import { RefreshTokenDto } from './DTO/refreshToken.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // signup root
  @MessagePattern({ cmd: 'AUTH_REGISTER' })
  async createUser(createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  // login root
  @MessagePattern({ cmd: 'AUTH_LOGIN' })
  async login(loginDto: LoginDto) {
    return await this.userService.login(loginDto);
  }

  @MessagePattern({ cmd: 'REFRESH_TOKEN' })
  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    return await this.userService.refreshTokens(refreshTokenDto.refreshToken);
  }

  // find by id root
  @MessagePattern({ cmd: 'GET_USER' })
  findUser(data: { id: number }) {
    return this.userService.findById(data.id);
  }

  // find all user root
  @MessagePattern({ cmd: 'GET_ALL_USERS' })
  findAll() {
    return this.userService.findAll();
  }

  // delete root
  @MessagePattern({ cmd: 'DELETE_USER' })
  async remove(data: { id: number }) {
    return await this.userService.remove(data.id);
  }
}

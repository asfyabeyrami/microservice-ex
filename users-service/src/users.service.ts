import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto, LoginDto, UserDto } from './DTO/user.dto';
import { DataAccess } from './DataAccess/dataAccess';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  // providers
  constructor(
    private readonly dataAccess: DataAccess,
    private readonly jwtService: JwtService,
  ) {}

  // create user
  async createUser(createUserDto: CreateUserDto): Promise<{
    status: number;
    massege?: string;
    error?: string;
  }> {
    const { userName, address, city, zipCode, password, email } = createUserDto;

    // fild checking
    // if (!userName || !password || email) {
    //   const reslut = {
    //     status: 403,
    //     error: 'همه فیلد ها الزامیست',
    //   };
    //   return reslut;
    // }
    // 095a8e2e-8ddd-4428-81cd-399f7d8146d8

    const checkUsername = await this.dataAccess.findByUserName(userName);
    const checkEmail = await this.dataAccess.findByEmail(email);

    // userName checking
    if (checkUsername) {
      const reslut = {
        status: 403,
        error: 'نام کاربری تکراریست',
        param: userName,
      };
      return reslut;
    }

    // email checking
    if (checkEmail) {
      const reslut = {
        status: 403,
        error: 'ایمیل تکراریست',
        param: email,
      };
      return reslut;
    }

    // password hash
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User+
    const user = await this.dataAccess.create(
      userName,
      address,
      city,
      zipCode,
      hashedPassword,
      email,
    );
    const reslut = {
      status: 200,
      massege: 'User Successfuly Created',
      error: null,
      User: user,
    };
    return reslut;
  }

  // User Login
  async login(loginDto: LoginDto): Promise<{
    status: number;
    massege?: string;
    error?: string;
    json?: UserDto;
  }> {
    // fild Checking
    const { userName, password } = loginDto;
    if (!userName || !password) {
      const reslut = {
        status: 403,
        error: 'همه فیلد ها الزامیست',
      };
      return reslut;
    }
    const user = await this.dataAccess.findByUserName(userName);

    // User Checking
    if (!user) {
      const reslut = {
        status: 403,
        error: `وجود ندارد (${userName}) :نام کاربری`,
        param: userName,
      };
      return reslut;
    }

    // pass Checking
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      const reslut = {
        status: 403,
        error: 'پسورد صحیح نمی باشد',
        param: 'password',
      };
      return reslut;
    }

    // Generate Token
    const token = await this.generateUserTokens(user.id);
    const reslut = {
      status: 200,
      userName: userName,
      error: null,
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
    };
    return reslut;
  }

  async refreshTokens(refreshToken: string): Promise<{
    status: number;
    massege?: string;
    error?: string;
    json?: UserDto;
  }> {
    const token = await this.dataAccess.findToken(refreshToken);
    if (!token) {
      const reslut = {
        status: 404,
        error: 'Unauthorized',
        param: 'token',
      };
      return reslut;
    }
    this.dataAccess.deleteToken(refreshToken);
    const newToken = await this.generateUserTokens(token.userId);
    const reslut = {
      status: 200,
      error: null,
      accessToken: newToken.accessToken,
      refreshToken: newToken.refreshToken,
    };
    return reslut;
  }

  async generateUserTokens(userId: number) {
    const accessToken = this.jwtService.sign({ userId });

    const refreshToken = uuidv4();

    await this.dataAccess.storeRefreshToken(refreshToken, userId);

    return {
      accessToken,
      refreshToken,
    };
  }

  // find user with id
  async findById(id: number) {
    try {
      const user = await this.dataAccess.findById(id);
      if (!user) {
        throw new HttpException('user not found', 404);
      } else {
        return user;
      }
    } catch (error) {
      throw error;
    }
  }

  // Delete User with id
  async remove(id: number) {
    return await this.dataAccess.remove(id);
  }

  // get All User
  async findAll() {
    return this.dataAccess.findAll();
  }
}

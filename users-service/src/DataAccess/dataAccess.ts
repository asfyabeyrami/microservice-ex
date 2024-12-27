import { Identifier } from 'sequelize';
import { User } from '../model/users.model';
import { HttpException } from '@nestjs/common';
import { RefreshToken } from '../model/refresh-tiken.model';

// Insert Into DataBase
export class DataAccess {
  tableName() {
    return User.tableName;
  }
  // Insert to users
  async create(
    userName: string,
    address: string,
    city: string,
    zipCode: number,
    password: string,
    email: string,
  ): Promise<User> {
    const user = await User.create({
      userName,
      address,
      city,
      zipCode,
      password,
      email,
    });
    return user;
  }

  // select by id
  async findById(id: number): Promise<User> {
    const user = await User.findOne({
      where: {
        id,
      },
    });
    return user;
  }

  async findToken(refreshToken: string) {
    const token = await RefreshToken.findOne({
      where: {
        token: refreshToken,
      },
    });
    return token;
  }
  async deleteToken(refreshToken: string) {
    await RefreshToken.destroy({
      where: {
        token: refreshToken,
      },
    });
  }

  // selecting all
  async findAll(): Promise<User[]> {
    return await User.findAll();
  }

  // delete
  async remove(id: number): Promise<void> {
    const user = await User.findByPk(id);
    if (!user) {
      throw new HttpException('user not found', 404);
    } else {
      await user.destroy();
    }
  }

  // select user where = userName
  async findByUserName(userName: string): Promise<User> {
    const user = await User.findOne({
      where: {
        userName,
      },
    });
    return user;
  }

  // select user where = email
  async findByEmail(email: string): Promise<User> {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    return user;
  }

  // insert into UsersTokens
  async storeRefreshToken(token: string, userId: number) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3);
    await RefreshToken.create({ token, userId, expiryDate });
  }
}

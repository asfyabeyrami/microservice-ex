import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './model/users.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DataAccess } from './DataAccess/dataAccess';
import { JwtModule } from '@nestjs/jwt';
import { RefreshToken } from './model/refresh-tiken.model';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: '123',
      signOptions: {
        expiresIn: '1h',
      },
    }),
    SequelizeModule.forFeature([User, RefreshToken]),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'asfya',
      password: '0521675413',
      database: 'shop',
      autoLoadModels: true,
      synchronize: true,
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, DataAccess],
})
export class AppModule {}

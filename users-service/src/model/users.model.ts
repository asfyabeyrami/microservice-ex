import {
  Column,
  Table,
  Model,
  HasMany,
  BelongsTo,
  ForeignKey,
  HasOne,
  DataType,
} from 'sequelize-typescript';
import Sequelize from 'sequelize';
import { RefreshToken } from './refresh-tiken.model';

@Table({
  tableName: 'users',
  paranoid: true,
  deletedAt: 'deletedAt',
})
export class User extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.BIGINT,
  })
  id: number;

  @Column({
    allowNull: false,
    type: Sequelize.STRING,
    unique: true,
  })
  userName: string;

  @Column({
    type: Sequelize.STRING,
    allowNull: false,
  })
  address: string;

  @Column({
    allowNull: false,
    type: Sequelize.STRING,
  })
  city: string;

  @Column({
    allowNull: false,
    type: Sequelize.INTEGER,
    unique: true,
  })
  zipCode: number;

  @Column({
    allowNull: false,
    type: Sequelize.STRING,
  })
  password: string;

  @Column({
    allowNull: true,
    type: Sequelize.STRING,
    unique: true,
  })
  email: string;

  @Column({
    defaultValue: new Date(),
    allowNull: false,
    type: Sequelize.DATE,
  })
  createdAt: Date;

  @Column({
    defaultValue: new Date(),
    allowNull: false,
    type: Sequelize.DATE,
  })
  updatedAt: Date;

  @HasMany(() => RefreshToken, { foreignKey: 'userId' })
  RefreshToken: RefreshToken[];
}
